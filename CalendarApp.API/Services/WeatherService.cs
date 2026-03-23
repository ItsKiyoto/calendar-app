using CalendarApp.API.DTOs;
using System.Text.Json;
namespace CalendarApp.API.Services;

public class WeatherService : IWeatherService
{
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public WeatherService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<WeatherResponseDto> GetWeatherAsync(double latitude, double longitude)
    {

        var client = _httpClientFactory.CreateClient();

        var url = $"https://api.open-meteo.com/v1/forecast" +
                  $"?latitude={latitude}" +
                  $"&longitude={longitude}" +
                  $"&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max" +
                  $"&hourly=temperature_2m,precipitation_probability,windspeed_10m,weathercode" +
                  $"&forecast_days=7" +
                  $"&timezone=Europe%2FLondon";

        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException(
                $"Weather API request failed with status {response.StatusCode}");

        var json = await response.Content.ReadAsStringAsync();

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var rawWeather = JsonSerializer.Deserialize<OpenMeteoResponseDto>(json, options)
            ?? throw new InvalidOperationException("Failed to deserialise weather response.");

        return MapToWeatherResponseDto(rawWeather, latitude, longitude);

        throw new NotImplementedException();
    }

    private WeatherResponseDto MapToWeatherResponseDto(
    OpenMeteoResponseDto raw, double latitude, double longitude)
    {
        var daily = new List<DailyWeatherDto>();

        for (int i = 0; i < raw.Daily.Time.Count; i++)
        {
            var date = DateTime.Parse(raw.Daily.Time[i]);
            var hourly = new List<HourlyWeatherDto>();

            for (int j = 0; j < raw.Hourly.Time.Count; j++)
            {
                var hourlyTime = DateTime.Parse(raw.Hourly.Time[j]);

                if (hourlyTime.Date == date.Date)
                {
                    hourly.Add(new HourlyWeatherDto
                    {
                        Time = hourlyTime,
                        Temperature = raw.Hourly.Temperature_2m[j],
                        PrecipitationProbability = raw.Hourly.Precipitation_probability[j],
                        WindSpeed = raw.Hourly.Windspeed_10m[j],
                        WeatherDescription = TranslateWeatherCode(raw.Hourly.Weathercode[j])
                    });
                }
            }

            daily.Add(new DailyWeatherDto
            {
                Date = date,
                MaxTemp = raw.Daily.Temperature_2m_max[i],
                MinTemp = raw.Daily.Temperature_2m_min[i],
                WeatherCode = raw.Daily.Weathercode[i],
                WeatherDescription = TranslateWeatherCode(raw.Daily.Weathercode[i]),
                PrecipitationProbability = raw.Daily.Precipitation_probability_max[i],
                MaxWindSpeed = raw.Daily.Windspeed_10m_max[i],
                Hourly = hourly
            });
        }

        return new WeatherResponseDto
        {
            Latitude = latitude,
            Longitude = longitude,
            Timezone = raw.Timezone,
            Daily = daily
        };
    }

    private static string TranslateWeatherCode(int code) => code switch
    {
        0 => "Clear Sky",
        1 => "Mainly Clear",
        2 => "Partly Cloudy",
        3 => "Overcast",
        45 or 48 => "Foggy",
        51 or 53 or 55 => "Drizzle",
        61 or 63 or 65 => "Rainy",
        71 or 73 or 75 => "Snowy",
        77 => "Hail",
        80 or 81 or 82 => "Showers",
        85 or 86 => "Snow Showers",
        95 => "Thunderstorm",
        96 or 99 => "Thunderstorm with Hail",
        _ => "Unknown"
    };

}
