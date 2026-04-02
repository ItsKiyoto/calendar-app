import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginRequest, register as registerRequest } from '@/api/auth'
import { getUser } from '@/api/user'
import { updateLocation } from '@/api/weather'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const response = await getUser()
                    setUser(response.data)
                } catch {
                    localStorage.removeItem('token')
                }
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    async function login(data) {
        const response = await loginRequest(data)
        const { token } = response.data
        localStorage.setItem('token', token)
        const userResponse = await getUser()
        setUser(userResponse.data)
    }

    function logout() {
        localStorage.removeItem('token')
        setUser(null)
    }

    async function register(data) {
        const response = await registerRequest(data)
        const { token } = response.data
        localStorage.setItem('token', token)
        const userResponse = await getUser()
        setUser(userResponse.data)
    }

    function updateUser(data) {
        setUser(prev => ({ ...prev, ...data }))
    }

    return (
        <AuthContext.Provider value={{ login, register, user, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}

