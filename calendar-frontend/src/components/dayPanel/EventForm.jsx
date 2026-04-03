import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { createEvent, updateEvent } from '@/api/events'

const COLOURS = [
    '#4A90D9', '#E85D5D', '#5DBE8A', '#F5A623',
    '#9B59B6', '#1ABC9C', '#E67E22', '#E91E8C'
]

export default function EventForm({ selectedDay, onBack, refetch, editingEvent }) {

    const [title, setTitle] = useState(editingEvent?.title ?? '')
    const [description, setDescription] = useState(editingEvent?.description ?? '')
    const [startTime, setStartTime] = useState(editingEvent?.startTime ?? '')
    const [endTime, setEndTime] = useState(editingEvent?.endTime ?? '')
    const [isAllDay, setIsAllDay] = useState(editingEvent?.isAllDay ?? false)
    const [location, setLocation] = useState(editingEvent?.location ?? '')
    const [colour, setColour] = useState(editingEvent?.colour ?? '#4A90D9')

    const inputClass = "border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400 text-sm"

    const handleSave = async () => {
        const data = {
            title,
            description,
            startTime: startTime || null,
            endTime: endTime || null,
            isAllDay,
            location: location || null,
            colour,
            date: format(selectedDay, 'yyyy-MM-dd')
        }
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, data)
            } else {
                await createEvent(data)
            }
            refetch()
            onBack()
        } catch (err) {
            console.error('Failed to save event', err)
        }
    }

    return (
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {/* <p className="text-xs text-gray-400 -mt-2">
                {format(selectedDay, 'EEEE do MMMM yyyy')}
            </p> */}

            <div className="flex flex-col gap-1">
                <Label className="text-m text-gray-400">Title</Label>
                <Input className={inputClass}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Event title" />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-m text-gray-400">Description</Label>
                <Input className={inputClass} value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional" />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox id="allday" checked={isAllDay} onCheckedChange={setIsAllDay} />
                <Label htmlFor="allday" className="text-m text-gray-400">All day</Label>
            </div>

            <div className={`flex gap-4 transition-opacity ${isAllDay ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col gap-1 flex-1">
                    <Label className="text-m text-gray-400">Start</Label>
                    <Input type="time" className={inputClass} value={startTime} onChange={e => setStartTime(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <Label className="text-m text-gray-400">End</Label>
                    <Input type="time" className={inputClass} value={endTime} onChange={e => setEndTime(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-m text-gray-400">Location</Label>
                <Input className={inputClass} value={location} onChange={e => setLocation(e.target.value)} placeholder="Optional" />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-m text-gray-400">Colour</Label>
                <div className="flex gap-2 flex-wrap px-2 py-1">
                    {COLOURS.map(c => (
                        <button
                            key={c}
                            onClick={() => setColour(c)}
                            className={`w-6 h-6 rounded-full transition-transform ${colour === c ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : ''}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            <Button className="w-full mt-auto" onClick={handleSave}>
                {editingEvent ? 'Save changes' : 'Create event'}
            </Button>
        </div>
    )
}
