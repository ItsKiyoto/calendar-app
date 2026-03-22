using CalendarApp.API.DTOs;
using CalendarApp.API.Models;
using CalendarApp.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using System.Security.Claims;

namespace CalendarApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthController(UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (dto.Password != dto.ConfirmPassword)
            return BadRequest("Passwords do not match");

        AppUser user = new AppUser()
        {
            DisplayName = dto.DisplayName,
            Email = dto.Email,
            UserName = dto.Email
        };

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        var token = _tokenService.GenerateToken(user);
        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);

        if (user == null)
            return Unauthorized("Invalid email or password.");

        bool passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

        if (!passwordValid)
            return Unauthorized("incorrect email or password.");
        
        
        var token = _tokenService.GenerateToken(user);
        return Ok(new { token });
        
    }

    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action(nameof(GoogleCallback)) //"/api/auth/google-callback" 
        };

        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        var authenticateResult = await HttpContext.AuthenticateAsync(
       IdentityConstants.ExternalScheme);

        if (!authenticateResult.Succeeded) 
            return Unauthorized("Google authentication failed.");

        var email = authenticateResult.Principal.FindFirstValue(ClaimTypes.Email);
        var name = authenticateResult.Principal.FindFirstValue(ClaimTypes.Name);
        var googleId = authenticateResult.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (email == null || googleId == null)
            return Unauthorized("Could not retrieve profile from Google.");

        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            user = new AppUser
            {
                Email = email,
                UserName = email,
                DisplayName = name ?? email
            };

            var createResult = await _userManager.CreateAsync(user);
            
            if (!createResult.Succeeded)
                return BadRequest(createResult.Errors.Select(e => e.Description));
            
            await _userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleId, "Google"));

        }

        var token = _tokenService.GenerateToken(user);

        return Redirect($"https://localhost:7289/#token={token}");

    }
}