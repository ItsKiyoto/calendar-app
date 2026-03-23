using Microsoft.AspNetCore.Identity;

namespace CalendarApp.API.Models;

public class AppUser : IdentityUser
{
    public string? DisplayName { get; set; }
    
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];

}