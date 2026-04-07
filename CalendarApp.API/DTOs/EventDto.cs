namespace CalendarApp.API.DTOs;

public class EventDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TimeOnly? StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
    public string? Location { get; set; }
    public bool IsAllDay { get; set; } 
    public string Colour { get; set; }
    public DateTime Date { get; set; }
}
