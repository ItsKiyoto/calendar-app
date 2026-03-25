using CalendarApp.API.DTOs;
using CalendarApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace CalendarApp.API.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;

    public UserController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPatch("location")]
    public async Task<IActionResult> UpdateLocation([FromBody] LocationDto dto)
    {

        var userId = GetUserId();
        if (userId == null)
            return Unauthorized("User authentication failed.");

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Unauthorized("User not found.");

        user.Latitude = dto.Latitude;
        user.Longitude = dto.Longitude;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        return NoContent();
    }
}
