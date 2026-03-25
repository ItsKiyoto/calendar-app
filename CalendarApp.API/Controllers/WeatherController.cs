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

    public WeatherController(UserManager<AppUser> userManager, IWeatherService weatherService)
    {
        _userManager = userManager;
        _weatherService = weatherService;
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
}
