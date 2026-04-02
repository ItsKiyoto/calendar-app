import { format, isSameDay } from 'date-fns'
import { getWeatherBackground, getTempColour, getPrecipColour, getWindColour } from '@/utils/weatherUtils'

export default function CalendarCell({ day, isCurrentMonth, isToday, weatherDay, onClick, selectedDay }) {
  const background = weatherDay
    ? getWeatherBackground(weatherDay.weatherDescription)
    : 'transparent'

  return (
    <div
      onClick={onClick}
      style={{
        height: 'calc((100vh - 220px) / 6)',
        ...(weatherDay? { backgroundColor: background } : {}),
      }}
      className={`relative p-2 border overflow-hidden cursor-pointer transition-colors duration-100
    ${selectedDay && isSameDay(day, selectedDay) ? 'border-red-400' : isToday ? 'border-blue-400' : 'border-gray-100'}
    hover:bg-gray-100`}
    >
      {/* Date number - top left */}
      <span className={`text-sm font-medium ${isToday ? 'text-blue-500' : !isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}`} 
      style={{ textShadow: weatherDay ? '0 0 3px rgba(255,255,255,0.9)' : 'none' }}>
        {format(day, 'd')}
      </span>

      {/* Weather stats - bottom right, only if weather data exists */}
      {weatherDay && (
        <div className="absolute bottom-2 right-2 flex flex-col items-end gap-0.5">
          <span className="text-xs" 
          style={{ color: getTempColour(weatherDay.maxTemp), textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.8)' }}>
            {weatherDay.maxTemp}°C
          </span>
          <span className="text-xs" 
          style={{ color: getTempColour(weatherDay.minTemp), textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.8)' }}>
            {weatherDay.minTemp}°C
          </span>
          <span className="text-xs" 
          style={{ color: getPrecipColour(weatherDay.precipitationProbability), textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.8)' }}>
            {weatherDay.precipitationProbability}%
          </span>
          <span className="text-xs" 
          style={{ color: getWindColour(weatherDay.maxWindSpeed), textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.8)' }}>
            {weatherDay.maxWindSpeed}mph
          </span>
        </div>
      )}
    </div>
  )
}