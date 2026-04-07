import { format, isSameDay } from 'date-fns'
import { getWeatherBackground, getTempColour, getPrecipColour, getWindColour } from '@/utils/weatherUtils'

export default function CalendarCell({ day, isCurrentMonth, isToday, weatherDay, onClick, selectedDay, dayEvents }) {
  const background = weatherDay
    ? getWeatherBackground(weatherDay.weatherDescription)
    : 'transparent'

  return (
    <div className={`flex flex-col h-full relative p-2 border overflow-hidden cursor-pointer transition-colors duration-100
          ${selectedDay && isSameDay(day, selectedDay) ? 'border-red-400' : isToday ? 'border-blue-400' : 'border-gray-100'}
          hover:bg-gray-100 `}
          onClick={onClick}
        style={{
          height: 'calc((100vh - 220px) / 6)',
          ...(weatherDay ? { backgroundColor: background } : {}),
        }}
        >
      <div
        className='flex justify-between items-start pb-1'
      >
        {/* Date number - top left */}
        <span className={`text-sm font-medium ${isToday ? 'text-blue-500' : !isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}`}
          style={{ textShadow: weatherDay ? '0 0 3px rgba(255,255,255,0.9)' : 'none' }}>
          {format(day, 'd')}
        </span>

        {/* Weather stats - bottom right, only if weather data exists */}
        {weatherDay && (
          <span className="text-sm"
            style={{ color: getTempColour(weatherDay.maxTemp), textShadow: '0 0 3px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.8)' }}>
            {weatherDay.maxTemp}°C
          </span>
        )}
      </div>
      <div className={'flex flex-col gap-0.5 '}>
        {dayEvents?.map(e => (
          <div className={'rounded-sm text-xs truncate px-1 text-white'}
            style={{ backgroundColor: e.colour }}
            key={e.id}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>

  )
}


{/* <span className="text-xs" 
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
          </span> */}
