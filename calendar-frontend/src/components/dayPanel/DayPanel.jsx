import { format, isToday } from 'date-fns'
import { } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTempColour, getPrecipColour, getWindColour, getSeverityInfo } from '@/utils/weatherUtils'
import { X, ChevronDown, ChevronLeft, ChevronUp, PencilLine, Trash2 } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import EventForm from './EventForm'
import { deleteEvent } from '@/api/events'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'


export default function DayPanel({ selectedDay, onClose, weatherDay, suggestion, refetch, dayEvents }) {
    const timelineRef = useRef(null)
    const [now, setNow] = useState(new Date())
    const [view, setView] = useState('day')
    const [editingEvent, setEditingEvent] = useState(null)
    const allDayEvents = dayEvents?.filter(e => e.isAllDay) ?? []
    const timedEvents = dayEvents?.filter(e => !e.isAllDay) ?? []
    const [eventsOpen, setEventsOpen] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000)
        return () => clearInterval(interval)
    }, [])

    // Effect 2: scrolls to current time when day is selected
    useEffect(() => {
        console.log(dayEvents)
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

    const handleAddEvent = () => {
        setEditingEvent(null)
        setView('form')
    }

    const handleBack = () => {
        setView('day')
        setEditingEvent(null)
    }

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id)
            refetch()
        } catch (err) {
            console.error('Failed to delete event', err)
        }
    }

    const handleEdit = (event) => {
        setEditingEvent(event)
        setView('form')
    }

    const timeToPixels = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number)
        return ((hours * 60 + minutes) / 1440) * 960
    }

    const formatTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes)
        return format(date, 'h:mma').toLowerCase()
    }




    return (
        <div className="w-96 shrink-0 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3"
            style={{ maxHeight: 'calc(100vh - 96px)' }}>
            <div className="flex justify-between items-center">
                {view === 'form' ? (
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                ) : (
                    <div />
                )}

                {/* X button always visible */}
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>
            {view === 'form' ? (
                <div>
                    <EventForm selectedDay={selectedDay}
                        onBack={handleBack}
                        refetch={refetch}
                        editingEvent={editingEvent}
                    ></EventForm>
                </div>
            ) : eventsOpen ? (
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                    <div className='text-xl'>Events:</div>
                    {dayEvents?.map(e => (
                        <div key={e.id} className='flex flex-col rounded-sm text-white' style={{ backgroundColor: e.colour }}>
                            <div className='flex flex-row justify-between items-center'>
                                <span className="text-m pl-1">{e.title}</span>
                                {e.isAllDay ? (<span className="opacity-75 mr-1">All Day</span>) : (<span className="opacity-75 mr-1">{formatTime(e.startTime)} - {formatTime(e.endTime)}</span>)}
                                <div>
                                    <Button className='bg-transparent hover:opacity-50'
                                        size='icon'
                                        onClick={() => handleEdit(e)} >
                                        <PencilLine className="w-4 h-4" ></PencilLine>
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className='bg-transparent hover:opacity-50' size='icon'>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete event?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete "{e.title}". This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(e.id)}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            {e.description ? (<span className="text-sm ml-1">{e.description}</span>) : ""}
                            {e.location ? (<span className="font-small ml-1">{e.location}</span>) : ""}
                        </div>

                    )
                    )}
                    <button onClick={() => setEventsOpen(!eventsOpen)}
                        className="flex flex-col items-center gap-1 w-full py-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <span className="text-xs uppercase tracking-wide">{eventsOpen ? <>Timeline</> : <>Events</>}</span>
                        {eventsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            ) : (
                <>
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

                    {/* All Day Events Pill */}
                    {allDayEvents.length > 0 && (
                        <div className="flex flex-col gap-1">
                            {allDayEvents.map(e => (
                                <div
                                    key={e.id}
                                    className="rounded-sm text-xs px-2 py-0.5 text-white truncate"
                                    style={{ backgroundColor: e.colour }}
                                >
                                    {e.title}
                                </div>
                            ))}
                        </div>
                    )}

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
                        {timedEvents?.map(e => {
                            const topTimed = timeToPixels(e.startTime)
                            const heightTimed = timeToPixels(e.endTime) - timeToPixels(e.startTime)
                            return (
                                <div
                                    key={e.id}
                                    className='absolute left-8 right-0 flex item-center text-white opacity-80 rounded-sm'
                                    style={{ top: `${topTimed + 8}px`, backgroundColor: e.colour, height: `${heightTimed}px` }}>
                                    <span className="font-medium truncate flex-1">{e.title}</span>
                                    <span className="opacity-75 shrink-0 ml-2">{formatTime(e.startTime)} - {formatTime(e.endTime)}</span>
                                </div>
                            )
                        }
                        )}
                        {isToday(selectedDay) && (() => {
                            const minutesIntoDay = now.getHours() * 60 + now.getMinutes()
                            const topPx = (minutesIntoDay / 1440) * 960
                            return (
                                <div className="absolute left-0 right-0 flex items-center" style={{ top: `${topPx}px` }}>
                                    <div className="w-2 h-2 rounded-full bg-red-500 ml-7" />
                                    <div className="flex-1 h-px bg-red-700" />
                                </div>
                            )
                        })()}
                    </div>

                    {/* Bottom actions */}
                    <Button variant="outline"
                        className="w-full text-sm"
                        size="sm"
                        onClick={handleAddEvent}>
                        + Add event
                    </Button>
                    <button onClick={() => setEventsOpen(!eventsOpen)}
                        className="flex flex-col items-center gap-1 w-full py-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <span className="text-xs uppercase tracking-wide">{eventsOpen ? <>Timeline</> : <>Events</>}</span>
                        {eventsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </>
            )
            }
        </div >
    )
}