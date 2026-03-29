import { Routes, Route, Navigate } from 'react-router-dom'
import CalendarPage from '@/pages/CalendarPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}