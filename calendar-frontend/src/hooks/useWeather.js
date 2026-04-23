import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'
import { getWeather } from '@/api/weather'

export function useWeather() {

    const { user } = useAuth()
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchWeather() {
            if (user && user.latitude != null) {
                const weatherInfo = localStorage.getItem('weatherInfo')
                const weatherTime = localStorage.getItem('weatherTime')
                if (weatherInfo && Date.now() - weatherTime < 3600000) {
                    setWeather(JSON.parse(weatherInfo))
                } else {
                    try {
                        const response = await getWeather()
                        setWeather(response)
                        localStorage.setItem('weatherInfo', JSON.stringify(response))
                        localStorage.setItem('weatherTime', Date.now())
                    } catch (err) {
                        setError(err)
                    }
                }
            }
            setLoading(false)
        }
        fetchWeather();
    }, [user])

    return { weather, loading, error }
}