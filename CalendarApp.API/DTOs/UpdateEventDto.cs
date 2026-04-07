namespace CalendarApp.API.DTOs;

public class UpdateEventDto
{
    public string? Title { get; set; }

    public string? Description { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public string? Location { get; set; }

    public bool? IsAllDay { get; set; }

    public string? Colour { get; set; } 
}
