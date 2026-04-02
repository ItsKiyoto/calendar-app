using CalendarApp.API.DTOs;
using CalendarApp.API.Models;
using CalendarApp.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CalendarApp.API.Controllers;

[ApiController]
[Route("api/weather")]
public class WeatherController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IWeatherService _weatherService;
    private readonly ISuggestionService _suggestionService;

    public WeatherController(UserManager<AppUser> userManager, IWeatherService weatherService, ISuggestionService suggestionService)
    {
        _userManager = userManager;
        _weatherService = weatherService;
        _suggestionService = suggestionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetWeather()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("User authentication failed.");

        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null)
            return Unauthorized("User not found.");
        
        if (user.Latitude == null || user.Longitude == null)
            return BadRequest("User location not set. Please set your location in your profile.");

        var weather = await _weatherService.GetWeatherAsync(user.Latitude.Value, user.Longitude.Value);

        return Ok(weather);
    }

    [HttpGet("suggestions")]
    public async Task<ActionResult<List<SuggestionDto>>> GetSuggestions()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("User authentication failed.");

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return Unauthorized("User not found.");

        if (user.Latitude == null || user.Longitude == null)
            return BadRequest("User location not set. Please set your location in your profile.");

        var forecast = await _weatherService.GetWeatherAsync(user.Latitude.Value, user.Longitude.Value);

        if (forecast == null) 
            return StatusCode(500, "Failed to retrieve weather data.");

        var suggestions = forecast.Daily.Select(day =>
            _suggestionService.GetSuggestions(day, new List<EventDto>())
        ).ToList();

        return Ok(suggestions);
    }

}
