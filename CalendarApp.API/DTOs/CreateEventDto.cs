using System.ComponentModel.DataAnnotations;

namespace CalendarApp.API.DTOs;

public class CreateEventDto
{        
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;
    
    public string? Description { get; set; }
    
    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public string? Location { get; set; }
    
    public bool IsAllDay { get; set; } = false;

    public string Colour { get; set; } = "#E15554";

    public DateTime Date { get; set; }
}
