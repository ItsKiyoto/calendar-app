namespace CalendarApp.API.DTOs;

public class HourlyWeatherDto
{
    public DateTime Time { get; set; }

    public double Temperature { get; set; }

    public int PrecipitationProbability { get; set; }

    public double WindSpeed { get; set; }
    
    public string WeatherDescription { get; set; } = string.Empty;
}
