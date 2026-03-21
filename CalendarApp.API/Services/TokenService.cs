using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CalendarApp.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace CalendarApp.API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(AppUser user)
    {
        // Claims are pieces of information about the user that will be included in the token.
        // Frontend can read these claims to get user information without needing to query the database.
        // Cannot be tampered with as the token is signed with a secret key - Invalidating the token.
        var claims = new List<Claim>
        {
            // NameIdentifier is a standard claim type for User's id
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.DisplayName ?? user.Email!),

            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // The secret key is used to sign the token.
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var expiry = DateTime.UtcNow.AddMinutes(
            double.Parse(_configuration["Jwt:ExpiryMinutes"] ?? "60"));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiry,
            signingCredentials: credentials
        );

    
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}