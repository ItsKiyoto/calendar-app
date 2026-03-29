import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
// import { Button } from "@/components/ui/button"
// import { Dialog,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger,} from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

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

// export function RegisterDialog() {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button variant="outline">Register</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-sm">
//           <DialogHeader>
//             <DialogTitle>Register an account</DialogTitle>
//             <DialogDescription>
//               Register an account using your email or sign up with Google.
//             </DialogDescription>
//           </DialogHeader>
//           <FieldGroup>
//             <Field>
//               <Label htmlFor="display-name">Display Name</Label>
//               <Input id="display-name" name="name"  />
//             </Field>
//             <Field>
//               <Label htmlFor="email-1">Email</Label>
//               <Input id="email-1" name="email" />
//             </Field>
//             <Field>
//               <Label htmlFor="password-1">Password</Label>
//               <Input id="password-1" name="password"  />
//             </Field>
//             <Field>
//               <Label htmlFor="password-2">Repeat Password</Label>
//               <Input id="password-2" name="password"  />
//             </Field>
//           </FieldGroup>
//           <Button>OAuth Button Placeholder</Button>
//           <DialogFooter>
//             <Button type="submit">Register Your Account</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }

