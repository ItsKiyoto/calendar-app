using CalendarApp.API.DTOs;
using CalendarApp.API.Models;

namespace CalendarApp.API.Services;

public class SuggestionService : ISuggestionService
{
    private const int DaytimeStartHour = 6;
    private const int DaytimeEndHour = 22;
    private static readonly Random random = new();
    private static readonly string[] AllDayPrefix =
        [
            "Looks like ",
            "Expecting ",
            "Forecast shows ",
            "It seems like ",
            "It looks like ",
            "Today's forecast shows ",
        ];

    
    public SuggestionDto GetSuggestions(DailyWeatherDto weather, List<EventDto> events)
    {
        var summary = BuildDayWeatherSummary(weather);

        return GetWeatherSuggestions(summary, weather);

    }

    private static SuggestionDto GetWeatherSuggestions(DayWeatherSummary summary, DailyWeatherDto weather)
    {

        if (summary.Family == WmoCodeFamily.Clear || summary.Family == WmoCodeFamily.Cloudy)
            return weather.MaxWindSpeed >= 50 ? GetWindSpeedSuggestion(weather) : GetTemperatureSuggestion(summary, weather);
     

        if (summary.IsAllday == true)
        {
        
            return new SuggestionDto
            {
                Message = $"{AllDayPrefix[random.Next(AllDayPrefix.Length)]} {summary.ConditionDescription} all day " +
                $"- {FamilySuffixes[(summary.Family, summary.Severity)][random.Next(FamilySuffixes[(summary.Family, summary.Severity)].Length)]}",
                Date = weather.Date,
                SeverityLevel = summary.Severity
            };
            

        } else if (summary.IsAllday == false && summary.ConditionStartTime != null)
        {
            return new SuggestionDto
            {
                Message = $"There is expected {summary.ConditionDescription} starting around {new DateTime(1, 1, 1, summary.ConditionStartTime.Value, 0, 0):h:mm tt}, " +
                          $"- {FamilySuffixes[(summary.Family, summary.Severity)][random.Next(FamilySuffixes[(summary.Family, summary.Severity)].Length)]}",
                Date = weather.Date,
                SeverityLevel = summary.Severity
            };
        } else
        {
            return new SuggestionDto
            {
                Message = $"There was some {summary.ConditionDescription} in the early morning - " +
                $"{FamilySuffixes[(summary.Family, summary.Severity)][random.Next(FamilySuffixes[(summary.Family, summary.Severity)].Length)]}",
                Date = weather.Date,
                SeverityLevel = summary.Severity
            };
        }
    }

    private static SuggestionDto GetWindSpeedSuggestion(DailyWeatherDto weather)
    {
        if (weather.MaxWindSpeed >= 80)
        {
            return new SuggestionDto
            {
                Message = $"Its extremly windy out with max speeds of {weather.MaxWindSpeed}mph, stay inside and avoid travelling.",
                Date = weather.Date,
                SeverityLevel = SuggestionSeverity.Danger
            };
        } else
        {
            return new SuggestionDto
            {
                Message = $"It's pretty windy out there with max speeds of {weather.MaxWindSpeed}mph, be careful if you have to be outside, and hold tight onto belongings.",
                Date = weather.Date,
                SeverityLevel = SuggestionSeverity.Warning
            };
        }
    }

    private static SuggestionDto GetTemperatureSuggestion(DayWeatherSummary summary, DailyWeatherDto weather)
    {
        if(summary.Family == WmoCodeFamily.Clear)
        {
            if (weather.MaxTemp >= 38){
                return new SuggestionDto
                {
                    Message = $"It's going to be a blazing {weather.MaxTemp}°C out there today, quite dangerous, stay inside and only go outside if necessary.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Danger
                };
            }
            else if (weather.MaxTemp >= 32 && weather.MaxTemp < 38)
            {
                return new SuggestionDto
                {
                    Message = $"It's going to be a blistering {weather.MaxTemp}°C degrees out today, stay inside and stay hydrated.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
            else if (weather.MaxTemp >= 28 && weather.MaxTemp < 32)
            {
                return new SuggestionDto
                {
                    Message = $"Its a scorching {weather.MaxTemp}°C out there today, stay hydrated and avoid being outside during the hottest part of the day! Or at least stay in a shadow if you are",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
            else if (weather.MaxTemp >= 23 && weather.MaxTemp < 28)
            {
                return new SuggestionDto
                {
                    Message = "Its hot out today, don't forget water and sunscreen!",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else if (weather.MaxTemp >= 18 && weather.MaxTemp < 23)
            {
                return new SuggestionDto
                {
                    Message = $"Its going to be a great {weather.MaxTemp}°C perfect to be outside, enjoy the sunshine!",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else if (weather.MaxTemp >= 5 && weather.MaxTemp < 18)
            {
                return new SuggestionDto
                {
                    Message = "Its a bit chilly today, a jacket or coat isn't a bad idea.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else
            {
                return new SuggestionDto
                {
                    Message = "It might look sunny, but its a freezing out there. Layer up, gloves and a scarf are a must.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
        } else
        {
            if (weather.MaxTemp >= 38)
            {
                return new SuggestionDto
                {
                    Message = $"Even though its gray out its still a blazing {weather.MaxTemp}°C out there today, stay inside and only go outside if necessary.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Danger
                };
            }
            else if (weather.MaxTemp >= 32 && weather.MaxTemp < 38)
            {
                return new SuggestionDto
                {
                    Message = $"The sun isn't out but its still a blistering {weather.MaxTemp}°C degrees out today, stay inside and stay hydrated.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
            else if (weather.MaxTemp >= 28 && weather.MaxTemp < 32)
            {
                return new SuggestionDto
                {
                    Message = $"Even though its a dull day its still a scorching {weather.MaxTemp}°C out there, stay hydrated and avoid being outside during the hottest, even though the sun isn't out its still be hot.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
            else if (weather.MaxTemp >= 23 && weather.MaxTemp < 28)
            {
                return new SuggestionDto
                {
                    Message = "Its a dull day today but its hot out today, don't forget water and sunscreen!",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else if (weather.MaxTemp >= 18 && weather.MaxTemp < 23)
            {
                return new SuggestionDto
                {
                    Message = "Grey day but still warm, nice to be outside!",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else if (weather.MaxTemp >= 5 && weather.MaxTemp < 18)
            {
                return new SuggestionDto
                {
                    Message = "Its a bit chilly today, a jacket or coat isn't a bad idea.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Info
                };
            }
            else
            {
                return new SuggestionDto
                {
                    Message = "It's dreary and freezing. Layer up, gloves and a scarf are a must.",
                    Date = weather.Date,
                    SeverityLevel = SuggestionSeverity.Warning
                };
            }
        }
    }

    private static DayWeatherSummary BuildDayWeatherSummary(DailyWeatherDto weather)
    {
        var dayCodeFamily = GetFamilyCode(weather.WeatherCode);
        var (isSuitable, severity, description) = GetFamilyProperties(dayCodeFamily, weather.WeatherCode);
        if (dayCodeFamily is WmoCodeFamily.Storm or WmoCodeFamily.FreezingPrecipitation)
        {
            return new DayWeatherSummary
            {
                IsAllday = true,
                IsOutsideSuitable = false,
                ConditionStartTime = null,
                ConditionDescription = description,
                Severity = severity,
                Family = dayCodeFamily
            };
        }
        
        int? startTime = null;

        int nOfHoursOfWeather = 0;

        bool allDay = false;

        for (int hour = 0; hour <= 23; hour++)
        {
            var hourly = weather.Hourly[hour];

            var hourlyCodeFamily = GetFamilyCode(hourly.WeatherCode);
            if (hourlyCodeFamily == dayCodeFamily)
            {
                startTime ??= hourly.Time.Hour;

                if (hour >= DaytimeStartHour && hour <= DaytimeEndHour)
                {
                    nOfHoursOfWeather++;
                }
            }
        }

        if (nOfHoursOfWeather >= 9)
        {
            allDay = true;
        }

        return new DayWeatherSummary
        {
            IsAllday = allDay,
            IsOutsideSuitable = isSuitable,
            ConditionStartTime = allDay || startTime < DaytimeStartHour ? null : startTime,
            ConditionDescription = description,
            Severity = severity,
            Family = dayCodeFamily
        };
        
    }

    private enum WmoCodeFamily { Clear, Cloudy, Fog, Drizzle, FreezingPrecipitation, Rain, Snow, Showers, Storm }

    private static WmoCodeFamily GetFamilyCode(int code) => code switch
    {
        0 or 1 => WmoCodeFamily.Clear,
        2 or 3 => WmoCodeFamily.Cloudy,
        45 or 48 => WmoCodeFamily.Fog,
        51 or 53 or 55 => WmoCodeFamily.Drizzle,
        56 or 57 or 66 or 67 => WmoCodeFamily.FreezingPrecipitation,
        61 or 63 or 65 => WmoCodeFamily.Rain,
        71 or 73 or 75 or 77 or 85 or 86 => WmoCodeFamily.Snow,
        80 or 81 or 82 => WmoCodeFamily.Showers,
        95 or 96 or 99 => WmoCodeFamily.Storm,
        _ => throw new ArgumentOutOfRangeException(nameof(code), $"Unexpected weather code: {code}")
    };

    private static (bool IsOutsideSuitable, SuggestionSeverity Severity, string Description) GetFamilyProperties(WmoCodeFamily family, int originalCode)
    {
        return (family, originalCode) switch
        {
            (WmoCodeFamily.Clear, _) => (true, SuggestionSeverity.Info, "clear skies"),
            (WmoCodeFamily.Cloudy, _) => (true, SuggestionSeverity.Info, "cloudy skies"),
            (WmoCodeFamily.Fog, 45) => (true, SuggestionSeverity.Info, "fog"),
            (WmoCodeFamily.Fog, 48) => (false, SuggestionSeverity.Warning, "freezing fog"),
            (WmoCodeFamily.Drizzle, _) => (true, SuggestionSeverity.Info, "drizzle"),
            (WmoCodeFamily.FreezingPrecipitation, 56 or 57) => (false, SuggestionSeverity.Warning, "freezing drizzle"),
            (WmoCodeFamily.FreezingPrecipitation, 66 or 67) => (false, SuggestionSeverity.Danger, "freezing rain"),
            (WmoCodeFamily.Rain, 61) => (true, SuggestionSeverity.Info, "light rain"),
            (WmoCodeFamily.Rain, 63) => (false, SuggestionSeverity.Warning, "moderate rain"),
            (WmoCodeFamily.Rain, 65) => (false, SuggestionSeverity.Danger, "heavy rain"),
            (WmoCodeFamily.Snow, 73 or 85) => (false, SuggestionSeverity.Warning, "moderate snow"),
            (WmoCodeFamily.Snow, 75 or 86) => (false, SuggestionSeverity.Danger, "heavy snow"),
            (WmoCodeFamily.Snow, 71) => (true, SuggestionSeverity.Info, "light snow"),
            (WmoCodeFamily.Snow, 77) => (true, SuggestionSeverity.Info, "snow grains"),
            (WmoCodeFamily.Showers, _) => (false, SuggestionSeverity.Warning, "showers"),
            (WmoCodeFamily.Storm, _) => (false, SuggestionSeverity.Danger, "thunderstorm activity"),
            _ => throw new ArgumentOutOfRangeException(nameof(family), $"Unexpected weather family: {family}")
        };
    }

    private class DayWeatherSummary
    {
        public bool IsAllday { get; init; }
        public bool IsOutsideSuitable { get; init; }
        public int? ConditionStartTime { get; init; }
        public string ConditionDescription { get; init; } = string.Empty;
        public SuggestionSeverity Severity { get; init; }
        public WmoCodeFamily Family { get; init; }

    }

    private static readonly Dictionary<(WmoCodeFamily,SuggestionSeverity), string[]> FamilySuffixes = new()
    {
        { (WmoCodeFamily.Fog, SuggestionSeverity.Info), [
            "visibilty will be low, be careful if you're driving.",
            "poor visibility, watch out if you're traveling.",
            "it looks pretty foggy out there, drive safely.",
            "it foggy out there, be careful if you're walking near traffic.",
            ] },
        {  (WmoCodeFamily.Fog, SuggestionSeverity.Warning), [
            "there could be some black ice, be careful if you're driving or walking.",
            "roads may be slippery, drive carefully.",
            "freezing fog can cause dangerous conditions, stay inside if you can.",
            "visibility may be tough, be careful if you're outside."
            ]  },

        { (WmoCodeFamily.Drizzle, SuggestionSeverity.Info), [
            "a light jacket should do the trick.",
            "a hoodie might be a good idea.",
            "an umbrella wouldn't go amiss."
            ] },

        { (WmoCodeFamily.FreezingPrecipitation,SuggestionSeverity.Warning), [
            "surfaces may look wet but could be icy, take extra care on foot and behind the wheel.",
            "black ice is likely, allow extra stopping distance if driving.",
            "pavements and roads may be deceptively slippery.",
            ] },

        { (WmoCodeFamily.FreezingPrecipitation,SuggestionSeverity.Danger), [
            "freezing rain creates dangerous ice on all surfaces, avoid travelling if at all possible.",
            "roads and pavements will be severely icy, stay indoors where you can.",
            "conditions are hazardous, only travel if absolutely necessary."
            ] },

        { (WmoCodeFamily.Rain, SuggestionSeverity.Info), [
            "bring an umbrella!",
            "a waterproof jacket is a good idea.",
            "try to stay dry where you can.",
            "grab a raincoat or an umbrella if you have to be outside.",
            "don't forget your umbrella!"
            ] },

        { (WmoCodeFamily.Rain, SuggestionSeverity.Warning), [
            "be careful if you're driving, roads might be slippery.",
            "make sure to wear a raincoat or grab an umbrella if you're heading out.",
            "may cause poor visibility, drive safely.",
            ] },

        { (WmoCodeFamily.Rain, SuggestionSeverity.Danger), [
            "avoid driving unless necessary.",
            "may cause flooding, avoid driving if you can.",
            "can cause dangerous conditions, stay inside if you can."
            ] },

        { (WmoCodeFamily.Snow, SuggestionSeverity.Info), [
            "don't forget gloves and layers if you're going outside.",
            "a warm coat and some gloves are a good idea if you have to be outside.",
            "wait for it to settle before you go out, it might be a bit slippery at first.",
            ] },

        { (WmoCodeFamily.Snow, SuggestionSeverity.Warning), [
            "layer up if you need to be out, but avoid if you can",
            "be careful if you're driving, roads might be slippery.",
            "may cause poor visibility, drive safely.",
            "may cause dangerous conditions, stay inside if you can.",
            ] },

        { (WmoCodeFamily.Snow, SuggestionSeverity.Danger), [
            "unsafe conditions, stay inside if you can.",
            "road closures and dangerous conditions possible, traveling only if emergency requires is best.",
            "best to stay inside until the snow stops.",
            ] },

        { (WmoCodeFamily.Showers,SuggestionSeverity.Warning), [
            "be careful if you're going outside, slippery conditions.",
            "be careful if you're driving, roads might be slippery.",
            "make sure to wear a raincoat or grab an umbrella if you're heading out.",
            ] },

        { (WmoCodeFamily.Storm, SuggestionSeverity.Danger), [
            "try to wait the storm out if you can.",
            "if you have to be outside, be careful and stay away from trees and power lines.",
            "thunderstorms can be dangerous, stay inside if you can and wait for it to pass.",
            ] }
    };
}