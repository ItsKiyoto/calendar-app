import { format, isToday } from 'date-fns'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTempColour, getPrecipColour, getWindColour, getSeverityInfo } from '@/utils/weatherUtils'
import { ChevronDown } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'


export default function DayPanel({ selectedDay, onClose, weatherDay, suggestion }) {
    const timelineRef = useRef(null)
    const [now, setNow] = useState(new Date())


    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000)
        return () => clearInterval(interval)
    }, [])

    // Effect 2: scrolls to current time when day is selected
    useEffect(() => {
        if (!selectedDay) return
        const timer = setTimeout(() => {
            if (timelineRef.current && isToday(selectedDay)) {
                const topPx = (now.getHours() * 60 + now.getMinutes()) / 1440 * 960
                timelineRef.current.scrollTop = topPx - 150
            }
        }, 50)
        return () => clearTimeout(timer)
    }, [selectedDay])

    if (!selectedDay) return null


    return (
        <div 
        className="w-96 shrink-0 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3" 
        style={{ maxHeight: 'calc(100vh - 96px)' }}>
            {/* X button row */}
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Date left, weather right */}
            <div className="flex justify-between items-start -mt-4">
                <div className='flex flex-col items-start'>
                    <span className="text-xs uppercase tracking-wide">
                        {format(selectedDay, 'EEEE')}
                    </span>
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {format(selectedDay, 'do')}
                    </span>
                    <span className="text-xs">
                        {format(selectedDay, 'MMMM yyyy')}
                    </span>
                </div>
                {weatherDay ? (
                    <div className="flex flex-col items-end gap-0.5 mt-1">
                        <span className="text-xs" style={{ color: getTempColour(weatherDay.maxTemp) }}>
                            {weatherDay.maxTemp}°C
                        </span>
                        <span className="text-xs" style={{ color: getTempColour(weatherDay.minTemp) }}>
                            {weatherDay.minTemp}°C
                        </span>
                        <span className="text-xs" style={{ color: getPrecipColour(weatherDay.precipitationProbability) }}>
                            {weatherDay.precipitationProbability}%
                        </span>
                        <span className="text-xs" style={{ color: getWindColour(weatherDay.maxWindSpeed) }}>
                            {weatherDay.maxWindSpeed}mph
                        </span>
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">No weather data</p>
                )}
            </div>

            {/* Suggestion */}
            {suggestion && (() => {
                const severity = getSeverityInfo(suggestion.severityLevel)
                return (
                    <div className="flex flex-col gap-1">
                        <span className={`text-xs font-medium ${severity.colour}`}>
                            {severity.symbol} {severity.label} — {weatherDay?.weatherDescription}
                        </span>
                        <p className="text-sm text-gray-600">{suggestion.message}</p>
                    </div>
                )
            })()}

            {/* Timeline */}
            <div className="relative overflow-y-auto flex-1 min-h-0 pt-2" ref={timelineRef}>
                <div className="absolute left-8 top-0 w-px bg-gray-200" style={{ height: `${24 * 40}px` }} />
                {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="relative flex items-start h-10">
                        <span className="w-8 text-right text-xs text-gray-400 pr-2 -mt-2">
                            {i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`}
                        </span>
                        <div className="w-2 h-px bg-gray-200 mt-0" />
                    </div>
                ))}
                {isToday(selectedDay) && (() => {
                    const minutesIntoDay = now.getHours() * 60 + now.getMinutes()
                    const topPx = (minutesIntoDay / 1440) * 960
                    return (
                        <div className="absolute left-0 right-0 flex items-center" style={{ top: `${topPx}px` }}>
                            <div className="w-2 h-2 rounded-full bg-red-500 ml-7" />
                            <div className="flex-1 h-px bg-red-500" />
                        </div>
                    )
                })()}
            </div>

            {/* Bottom actions */}
            <Button variant="outline" className="w-full text-sm" size="sm">
                + Add event
            </Button>
            <button className="flex flex-col items-center gap-1 w-full py-2 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="text-xs uppercase tracking-wide">Events</span>
                <ChevronDown className="w-4 h-4" />
            </button>
        </div>
    )
}