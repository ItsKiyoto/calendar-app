import { useState, useEffect} from 'react';
import { useAuth } from '@/context/AuthContext'
import { getWeather } from '@/api/weather'

export function useWeather(){
    
    const { user } = useAuth()
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect (() => {
        // console.log('useWeather effect fires, user:', user)
            async function fetchWeather(){
                if (user && user.latitude != null){
                    try {
                        const response = await getWeather()
                        // console.log('weather response', response.data)
                        // console.log('daily sample:', response.data.daily[0])
                        setWeather(response)
                    } catch (err) {
                        setError(err)
                    }
                }
                setLoading(false)
            }
            fetchWeather();
        }, [user])

        return { weather, loading, error }
}