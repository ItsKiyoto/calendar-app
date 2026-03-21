using CalendarApp.API.Models;

namespace CalendarApp.API.Services;

public interface ITokenService
{
    string GenerateToken(AppUser user);
}