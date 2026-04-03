import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/auth/Navbar'
import LoginModal from '@/components/auth/LoginModal'
import RegisterModal from '@/components/auth/RegisterModal'
import LocationModal from '@/components/calendar/LocationModal'
import CalendarGrid from '@/components/calendar/CalendarGrid'
import { useWeather } from '@/hooks/useWeather'
import { useSuggestions } from '@/hooks/useSuggestions'
import DayPanel from '@/components/dayPanel/DayPanel'
import { isSameDay } from 'date-fns'
import { useEvents } from '@/hooks/useEvents'



export default function CalendarPage() {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [panelDay, setPanelDay] = useState(null)
  const { weather } = useWeather()
  const { suggestions } = useSuggestions()

  const selectedWeatherDay = weather?.daily?.find((w) =>
    panelDay && isSameDay(new Date(w.date), panelDay))
  const selectedSuggestion = suggestions?.find((s) =>
    panelDay && isSameDay(new Date(s.date), panelDay))

  const handleDaySelect = (day) => {
    setPanelDay(day)
    setSelectedDay(day)
  }

  const handleClose = () => {
    setSelectedDay(null)
    // panelDay stays set so content remains during slide-out
  }

  useEffect(() => {
    if (user && user.latitude == null) {
      setLocationOpen(true)
    }
  }, [user])

  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      {/* Navbar always at top */}
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />

      {/* Modals */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
      <LocationModal open={locationOpen} onClose={() => setLocationOpen(false)} />

      {/* Main content area - panel and grid side by side */}
      <main className="flex-1 flex items-start justify-center gap-6 px-6 py-6 overflow-hidden">
        {/* Panel - in normal flow, animates width */}
        <div className={`shrink-0 transition-all duration-300 ease-in-out 
          ${selectedDay ? 'w-102' : 'w-0'}`}>
          <div className={`transition-opacity duration-300
      ${selectedDay ? 'opacity-100' : 'opacity-0'}`}>
            <DayPanel
              selectedDay={panelDay}
              onClose={handleClose}
              weatherDay={selectedWeatherDay}
              suggestion={selectedSuggestion}
              useEvents={useEvents}
            />
          </div>
        </div>

        {/* Calendar - fixed width, never shrinks */}
        <div className={`shrink-0 transition-all duration-300 ease-in-out
  ${selectedDay ? 'w-[calc(100vw-380px)]' : 'w-[calc(100vw-80px)]'} max-w-5xl`}>
          <CalendarGrid 
          onDaySelect={handleDaySelect} 
          weather={weather} 
          selectedDay={selectedDay}
          onClose={handleClose}
          />
        </div>
      </main>
    </div>
  )
}