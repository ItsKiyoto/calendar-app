import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { updateLocation } from '@/api/weather'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LocationModal({ open, onClose }) {
  const { updateUser } = useAuth()
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)
  const [searching, setSearching] = useState(false)

  // Debounced search — waits 400ms after the user stops typing
  useEffect(() => {
    if (!input || input.length < 2) {
      setResults([])
      return
    }
    const timeout = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}&count=5&language=en&format=json`
        )
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setError(new Error('Could not search for locations'))
      } finally {
        setSearching(false)
      }
    }, 400)

    // Cleanup — cancels the timeout if the user types again before 400ms
    return () => clearTimeout(timeout)
  }, [input])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selected) return
    setError(null)
    const location = (`${selected.name}, ${selected.country}`)
    try {
      await updateLocation(selected.latitude, selected.longitude, location)
      updateUser({ latitude: selected.latitude, longitude: selected.longitude, city : location })
      onClose()
    } catch (err) {
      setError(err)
    }
  }

  function handleSelect(place) {
    setSelected(place)
    setInput(`${place.name}, ${place.country}`)
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set your location</DialogTitle>
          <DialogDescription>
            Used to show local weather on your calendar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setSelected(null)
              }}
              placeholder="e.g. Southampton"
            />
            {/* Dropdown results */}
            {results.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 overflow-hidden">
                {results.map((place) => (
                  <button
                    key={`${place.latitude}-${place.longitude}`}
                    type="button"
                    onClick={() => handleSelect(place)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium">{place.name}</span>
                    <span className="text-gray-400 ml-2">
                      {[place.admin1, place.country].filter(Boolean).join(', ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {searching && (
            <p className="text-sm text-gray-400">Searching...</p>
          )}
          {error && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={!selected}
          >
            Save location
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}