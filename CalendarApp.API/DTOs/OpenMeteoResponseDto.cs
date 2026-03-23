namespace CalendarApp.API.DTOs;
public class OpenMeteoResponseDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Timezone { get; set; } = string.Empty;
    public OpenMeteoDailyDto Daily { get; set; } = new();
    public OpenMeteoHourlyDto Hourly { get; set; } = new();
}

public class OpenMeteoDailyDto
{
    public List<string> Time { get; set; } = [];
    public List<double> Temperature_2m_max { get; set; } = [];
    public List<double> Temperature_2m_min { get; set; } = [];
    public List<int> Weathercode { get; set; } = [];
    public List<int> Precipitation_probability_max { get; set; } = [];
    public List<double> Windspeed_10m_max { get; set; } = [];
}

public class OpenMeteoHourlyDto
{
    public List<string> Time { get; set; } = [];
    public List<double> Temperature_2m { get; set; } = [];
    public List<int> Precipitation_probability { get; set; } = [];
    public List<double> Windspeed_10m { get; set; } = [];
    public List<int> Weathercode { get; set; } = [];
}
}
