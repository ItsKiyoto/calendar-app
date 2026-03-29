import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { user, logout } = useAuth()

return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <span className="text-xl font-semibold text-gray-800">Cal.io</span>
      <div className="flex gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-600 self-center">
              {user.displayName}
            </span>
            <Button variant="outline" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onLoginClick}>
              Log in
            </Button>
            <Button onClick={onRegisterClick}>
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}