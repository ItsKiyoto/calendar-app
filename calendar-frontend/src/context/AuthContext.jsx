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
            const loginTime = localStorage.getItem('loginTime')
            if (token) {
                if (Date.now() - loginTime > 3600000) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('loginTime')
                } else {
                    try {
                        const response = await getUser()
                        setUser(response)
                    } catch {
                        localStorage.removeItem('token')
                        localStorage.removeItem('loginTime')
                    }
                }
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const loginTime = localStorage.getItem('loginTime')
            if (Date.now() - loginTime > 3600000) {
                logout()
            }
        }, 60000)

        return () => clearInterval(interval) // cleanup on unmount
    }, [logout])

    async function register(data) {
        const response = await registerRequest(data) //
        const { token } = response
        localStorage.setItem('token', token)
        localStorage.setItem('loginTime', Date.now())
        const userResponse = await getUser() //
        setUser(userResponse)
    }

    async function login(data) {
        const response = await loginRequest(data)
        const { token } = response
        localStorage.setItem('token', token)
        localStorage.setItem('loginTime', Date.now())
        const userResponse = await getUser()
        setUser(userResponse)
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('loginTime')
        localStorage.removeItem('weatherInfo')
        localStorage.removeItem('weatherTime')
        localStorage.removeItem('suggestions')
        localStorage.removeItem('suggestionsTime')
        setUser(null)
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

