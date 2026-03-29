using System.ComponentModel.DataAnnotations;

namespace CalendarApp.API.DTOs;

public class CreateEventDto
{        
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;
    
    public string? Description { get; set; }
    
    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Location { get; set; }
    
    public bool IsAllDay { get; set; } = false;

    public string Colour { get; set; } = "#3B82F6";
}
