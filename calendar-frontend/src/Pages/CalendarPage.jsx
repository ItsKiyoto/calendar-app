import { useState } from 'react'
import Navbar from '@/components/auth/Navbar'
import LoginModal from '@/components/auth/LoginModal'
import RegisterModal from '@/components/auth/RegisterModal'

export default function CalendarPage() {

  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  LoginModal(loginOpen, setLoginOpen)
  RegisterModal(registerOpen, setRegisterOpen)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />
      <LoginModal 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)} />
      <RegisterModal 
        open={(registerOpen)}
        onClose={() => setRegisterOpen(false)} />
      <main className="flex items-center justify-center h-[calc(100vh-65px)]">
        <p className="text-gray-400 text-sm">Calendar coming soon</p>
      </main>
    </div>
  )
}