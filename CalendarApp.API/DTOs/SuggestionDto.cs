using CalendarApp.API.Models;

namespace CalendarApp.API.DTOs;

public class SuggestionDto
{
    public string Message { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public SuggestionSeverity SeverityLevel { get; set; }
}
