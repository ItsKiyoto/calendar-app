using Microsoft.AspNetCore.Identity;

namespace CalendarApp.API.Models
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];

    }
}