import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/auth/Navbar'
import LoginModal from '@/components/auth/LoginModal'
import RegisterModal from '@/components/auth/RegisterModal'
import LocationModal from '@/components/calendar/LocationModal'
import CalendarGrid from '@/components/calendar/CalendarGrid'

export default function CalendarPage() {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)

  useEffect(() => {
    if (user && user.latitude == null) {
      setLocationOpen(true)
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <LocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
      />
      <main className="flex items-center justify-center min-h-[calc(100vh-65px)] bg-gray-100">
        <CalendarGrid />
      </main>
    </div>
  )
}