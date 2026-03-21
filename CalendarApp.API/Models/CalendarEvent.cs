using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CalendarApp.API.Models;

public class CalendarEvent
{
	public int Id { get; set; }
	public string Title { get; set; } = null!;
	public string? Description { get; set; }
	public DateTime StartTime { get; set; }
	public DateTime EndTime { get; set; }
	public string? Location { get; set; }
	public bool IsAllDay { get; set; } = false;
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;

	// Foreign key to associate the event with a user
	public string UserId { get; set; } = string.Empty;
	public AppUser User { get; set; } = null!;
}