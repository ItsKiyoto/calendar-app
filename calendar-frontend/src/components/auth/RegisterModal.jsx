import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterModal({ open, onClose }) {
  const { register } = useAuth()
  const [displayName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await register({ displayName, email, password, confirmPassword })
      onClose()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register with email or Google.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
                id="name"
                type="text"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
            />
        </div>
          {error && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <div className="relative text-center text-sm text-gray-400 my-1">or</div>
        <Button variant="outline" className="w-full" type="button">
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}