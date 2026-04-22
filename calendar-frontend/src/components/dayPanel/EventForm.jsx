import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { createEvent, updateEvent } from '@/api/events'

const COLOURS = [
    '#E15554', '#E1893F', '#E1BC29', '#3BB273',
    '#50B7B9', '#4D9DE0', '#7768AE', '#D65D8A',
    '#B1B1B1'
]

export default function EventForm({ selectedDay, onBack, refetch, editingEvent}) {

    const [title, setTitle] = useState(editingEvent?.title ?? '')
    const [description, setDescription] = useState(editingEvent?.description ?? '')
    const [startTime, setStartTime] = useState(editingEvent?.startTime ?? '')
    const [endTime, setEndTime] = useState(editingEvent?.endTime ?? '')
    const [isAllDay, setIsAllDay] = useState(editingEvent?.isAllDay ?? false)
    const [location, setLocation] = useState(editingEvent?.location ?? '')
    const [colour, setColour] = useState(editingEvent?.colour ?? '#E15554')
    const [error, setError] = useState(null)

    const inputClass = "border-0 border-b border-muted rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent text-sm"

    const handleSave = async () => {
        setError(null)
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
        if (!title.trim()) {
            setError('Please enter a title')
            return
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
            console.log(err.data)
            const data = err.data
            if (typeof data === 'string') {
                setError(data)
            } else {
                setError('Something went wrong, please try again')
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 overflow-y-auto animate-fade-in"
        key={selectedDay?.toISOString()}
        >
            <div className="flex flex-col gap-1">
                <Label className="text-m text-muted-foreground">Title</Label>
                <Input className={inputClass}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Event title" />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-m text-muted-foreground">Description</Label>
                <Input className={inputClass} value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional" />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox id="allday" checked={isAllDay} onCheckedChange={setIsAllDay} />
                <Label htmlFor="allday" className="text-m text-muted-foreground">All day</Label>
            </div>

            <div className={`flex gap-4 transition-opacity ${isAllDay ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col gap-1 flex-1">
                    <Label className="text-m text-muted-foreground">Start</Label>
                    <Input type="time" className={inputClass} value={startTime} onChange={e => setStartTime(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <Label className="text-m text-muted-foreground">End</Label>
                    <Input type="time" className={inputClass} value={endTime} onChange={e => setEndTime(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-m text-muted-foreground">Location</Label>
                <Input className={inputClass} value={location} onChange={e => setLocation(e.target.value)} placeholder="Optional" />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-m text-muted-foreground">Colour</Label>
                <div className="flex gap-2 flex-wrap px-2 py-1">
                    {COLOURS.map(c => (
                        <button
                            key={c}
                            onClick={() => setColour(c)}
                            className={`w-6 h-6 rounded-full transition-transform ${colour === c ? 'scale-125 ring-2 ring-offset-1 ring-accent' : ''}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>
            <div>
                {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            </div>

            <Button className="w-full" onClick={handleSave}>
                {editingEvent ? 'Save changes' : 'Create event'}
            </Button>
        </div>
    )
}
