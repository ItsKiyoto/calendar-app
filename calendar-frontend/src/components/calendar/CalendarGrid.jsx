import { useState } from 'react'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameMonth, isToday,
  addMonths, subMonths, isSameDay
} from 'date-fns'
import CalendarHeader from './CalendarHeader'
import { useWeather } from '@/hooks/useWeather'
import CalendarCell from './CalendarCell'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const gridStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
  const gridEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })
  const { weather, loading, error } = useWeather();

return (
    <div className="w-full max-w-4xl">
        <CalendarHeader
            currentDate={currentDate}
            onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
            onNext={() => setCurrentDate(addMonths(currentDate, 1))}
        />
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl">
            <div className="p-6">
                <div className="grid grid-cols-7 mt-4">
                    {DAY_NAMES.map((name) => (
                    <div key={name} className="text-xs font-medium text-gray-400 text-center py-2">
                        {name}
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-6 min-h-[520px]">
                    {days.map((day) => {
                        const weatherDay = weather?.daily?.find((w) => isSameDay(new Date(w.date), day))
                        return (
                            <CalendarCell
                                key={day.toISOString()}
                                day={day}
                                isCurrentMonth={isSameMonth(day, currentDate)}
                                isToday={isToday(day)}
                                weatherDay={weatherDay}
                                onClick={() => { if (!isSameMonth(day, currentDate)) { setCurrentDate(day) }}}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}