using CalendarApp.API.DTOs;

namespace CalendarApp.API.Services;

public interface ISuggestionService
{
    SuggestionDto GetSuggestions(DailyWeatherDto weather, List<EventDto> events);
}
