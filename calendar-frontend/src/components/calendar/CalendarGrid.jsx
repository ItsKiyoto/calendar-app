import { useState } from 'react'
import {
    startOfMonth, endOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, isSameMonth, isToday,
    addMonths, subMonths, isSameDay
} from 'date-fns'
import CalendarHeader from './CalendarHeader'
import CalendarCell from './CalendarCell'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarGrid({ onDaySelect, weather, selectedDay, onClose, events, holidays }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const gridStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
    const gridEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start: gridStart, end: gridEnd })

    // const isCurrentMonth = isSameMonth(currentDate, new Date())

    return (
        <div className="w-full">
            <CalendarHeader
                currentDate={currentDate}
                onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
                onNext={() => setCurrentDate(addMonths(currentDate, 1))}
                isCurrentMonth={isSameMonth(currentDate, new Date())}
                setCurrentMonth={() => setCurrentDate(new Date())}
            />
            <div className="bg-card rounded-2xl shadow-sm p-4">
                <div className="grid grid-cols-7">
                    {DAY_NAMES.map((name) => (
                        <div key={name} className="text-xs font-medium text-muted-foreground text-center py-2">
                            {name}
                        </div>
                    ))}
                </div>
                <div 
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                className="grid grid-cols-7 animate-fade-in">
                    {days.map((day) => {
                        const weatherDay = weather?.daily?.find((w) => isSameDay(new Date(w.date), day))
                        const dayEvents = events?.filter((e) => isSameDay(new Date(e.date), day))
                        const dayHolidays = holidays?.filter((h) => isSameDay(new Date(h.date), day))
                        return (
                            <CalendarCell
                                key={day.toISOString()}
                                day={day}
                                isCurrentMonth={isSameMonth(day, currentDate)}
                                isToday={isToday(day)}
                                weatherDay={weatherDay}
                                selectedDay={selectedDay}
                                dayEvents={dayEvents}
                                dayHolidays={dayHolidays}
                                onClick={() => {
                                    if (!isSameMonth(day, currentDate)) {
                                        setCurrentDate(day)
                                    } else if (selectedDay && isSameDay(day, selectedDay)) {
                                        onClose()
                                    } else {
                                        onDaySelect(day)
                                    }
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}