namespace CalendarApp.API.DTOs;

public class DailyWeatherDto
{
    public DateTime Date { get; set; }

    public double MaxTemp { get; set; }

    public double MinTemp { get; set; }

    //public string WeatherDescription { get; set; } = string.Empty;

    public int WeatherCode { get; set; }

    public int PrecipitationProbability { get; set; }

    public double MaxWindSpeed { get; set; }

    public List<HourlyWeatherDto> Hourly { get; set; } = new List<HourlyWeatherDto>();
}
