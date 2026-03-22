using CalendarApp.API.Data;
using CalendarApp.API.DTOs;
using CalendarApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalendarApp.API.Controllers
{
    [ApiController]
    [Route("api/events")]
    public class CalendarEventsController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _appDbContext;

        public CalendarEventsController(UserManager<AppUser> userManager, AppDbContext appDbContext)
        {
            _userManager = userManager;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized("User authentication failed.");

            var events = await _appDbContext.CalendarEvents.Where(e => e.UserId == userId).Select(e => MapToDto(e)).ToListAsync();

            return Ok(events);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized("User authentication failed.");

            if (!dto.IsAllDay)
            {
                if (dto.StartTime == null || dto.EndTime == null)
                    return BadRequest("Start time and end time are required for non all-day events.");

                if (dto.StartTime >= dto.EndTime)
                    return BadRequest("Start time must be before end time.");
            }

            var calendarEvent = new CalendarEvent
            {
                Title = dto.Title,
                Description = dto.Description,
                StartTime = dto.IsAllDay == false ? ToUtc(dto.StartTime) : null,
                EndTime = dto.IsAllDay == false ? ToUtc(dto.EndTime) : null,
                Location = dto.Location,
                IsAllDay = dto.IsAllDay,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                UserId = userId,
            };

            _appDbContext.CalendarEvents.Add(calendarEvent);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvents), new { id = calendarEvent.Id }, MapToDto(calendarEvent));

        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateEvent([FromRoute] int id, [FromBody] UpdateEventDto dto)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized("User authentication failed.");

            var calendarEvent = await _appDbContext.CalendarEvents
                .FirstOrDefaultAsync(e => e.UserId == userId && e.Id == id);

            if (calendarEvent == null)
                return NotFound("Event not found.");

            if (dto.Title != null)
                calendarEvent.Title = dto.Title;

            if (dto.Description != null)
                calendarEvent.Description = dto.Description;
            
            if (dto.Location != null)
                calendarEvent.Location = dto.Location;
                        
            if (dto.IsAllDay == true)
            {
                calendarEvent.IsAllDay = true;
                dto.StartTime = null;
                dto.EndTime = null;

            }
            else if (dto.IsAllDay == false) {
                
                if (dto.StartTime == null || dto.EndTime == null)
                    return BadRequest("Start time and end time are required for non all-day events.");
                
                if (dto.StartTime >= dto.EndTime)
                    return BadRequest("Start time must be before end time.");

                calendarEvent.IsAllDay = false;
                calendarEvent.StartTime = ToUtc(dto.StartTime);
                calendarEvent.EndTime = ToUtc(dto.EndTime);
            }
            else
            {
                if (dto.StartTime != null || dto.EndTime != null)
                {
                    var newStart = ToUtc(dto.StartTime) ?? calendarEvent.StartTime;
                    var newEnd = ToUtc(dto.EndTime) ?? calendarEvent.EndTime;

                    if (newStart >= newEnd)
                        return BadRequest("Start time must be before end time.");

                    calendarEvent.StartTime = ToUtc(dto.StartTime) ?? calendarEvent.StartTime;
                    calendarEvent.EndTime = ToUtc(dto.EndTime) ?? calendarEvent.EndTime;
                }
            }

            calendarEvent.LastUpdatedAt = DateTime.UtcNow;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent([FromRoute] int id)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized("User authentication failed.");

            var calendarEvent = await _appDbContext.CalendarEvents
                .FirstOrDefaultAsync(e => e.UserId == userId && e.Id == id);

            if (calendarEvent == null)
                return NotFound("Event not found.");

            _appDbContext.CalendarEvents.Remove(calendarEvent);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to map CalendarEvent to EventDto, Aware of AutoMapper but doing it manually here for simplicity
        private static EventDto MapToDto(CalendarEvent calendarEvent)
        {
            return new EventDto
            {
                Id = calendarEvent.Id,
                Title = calendarEvent.Title,
                Description = calendarEvent.Description,
                StartTime = calendarEvent.StartTime,
                EndTime = calendarEvent.EndTime,
                Location = calendarEvent.Location,
                IsAllDay = calendarEvent.IsAllDay
            };
        }
    }
}
