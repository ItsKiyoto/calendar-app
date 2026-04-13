import { format, isSameDay } from 'date-fns'
import { getWeatherBackground, getTempColour, getPrecipColour, getWindColour } from '@/utils/weatherUtils'

export default function CalendarCell({ day, isCurrentMonth, isToday, weatherDay, onClick, selectedDay, dayEvents, dayHolidays }) {
  const background = weatherDay
    ? getWeatherBackground(weatherDay.weatherDescription)
    : 'transparent'

  const allItems = [
    ...(dayHolidays ?? []).map(h => ({ type: 'holiday', key: h.title, label: h.title, colour: '#d3263a', border: true })),
    ...(dayEvents ?? []).map(e => ({ type: 'event', key: e.id, label: e.title, colour: e.colour, border: false }))
  ];

  const MAX_PILLS = 2;
  const visible = allItems.slice(0, MAX_PILLS);
  const overflow = allItems.length - MAX_PILLS;
  const hidden = allItems.slice(MAX_PILLS);

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

      <div className="absolute bottom-1 left-1 right-1 flex flex-col gap-0.5">
        {visible.map(item => (
          <div
            key={item.key}
            className={`rounded-sm text-xs px-1 text-white truncate ${item.border ? 'border-2 border-blue-900' : ''}`}
            style={{ backgroundColor: item.colour }}
          >
            {item.label}
          </div>
        ))}
        {hidden.length > 0 && (
          <div className="flex gap-0.5 px-1">
            {hidden.slice(0, 3).map((item) => (
              <div key={item.key} className="w-1 h-1 rounded-full" style={{ backgroundColor: item.colour }} />
            ))}
          </div>
        )}
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
