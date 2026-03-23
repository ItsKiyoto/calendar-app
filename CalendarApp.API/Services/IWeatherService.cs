using CalendarApp.API.DTOs;

namespace CalendarApp.API.Services
{
    public interface IWeatherService
    {
        Task<WeatherResponseDto> GetWeatherAsync(double latitude, double longitude);
    }
}
