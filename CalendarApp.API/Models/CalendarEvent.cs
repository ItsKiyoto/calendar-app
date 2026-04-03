using System.ComponentModel.DataAnnotations;

namespace CalendarApp.API.Models;

public class CalendarEvent
{
	public int Id { get; set; }
	public string Title { get; set; } = null!;
	public string? Description { get; set; }
	public DateTime? StartTime { get; set; }
	public DateTime? EndTime { get; set; }
	public string? Location { get; set; }
	public bool IsAllDay { get; set; } = false;
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    [RegularExpression(@"^#[0-9A-Fa-f]{6}$", ErrorMessage = "Colour must be a valid hex code.")]
    public string Colour { get; set; } = "#3B82F6"; // a nice default blue
	public DateTime Date { get; set; }

    // Foreign key to associate the event with a user
    public string UserId { get; set; } = string.Empty;
	public AppUser User { get; set; } = null!;
}