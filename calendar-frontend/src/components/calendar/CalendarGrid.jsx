import { useState } from 'react'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameMonth, isToday,
  addMonths, subMonths
} from 'date-fns'
import CalendarHeader from './CalendarHeader'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const gridStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
  const gridEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })

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
                {days.map((day) => (
                <div
                    key={day.toISOString()}
                    onClick={() => {
                    if (!isSameMonth(day, currentDate)) {
                        setCurrentDate(day)
                    }
                    }}
                    className={
                    isToday(day)
                        ? 'p-2 text-sm font-bold text-blue-600 hover:bg-gray-50 cursor-pointer min-h-24 p-2 border border-blue-200'
                        : isSameMonth(day, currentDate)
                        ? 'p-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 min-h-24 p-2 border border-gray-100'
                        : 'p-2 text-sm text-gray-300 hover:bg-gray-50'
                    }
                >
                    <span className="flex items-center justify-center w-7 h-7 text-sm font-medium">
                        {format(day, 'd')}
                    </span>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  )
}