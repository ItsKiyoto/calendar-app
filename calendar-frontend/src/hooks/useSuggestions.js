import { useState, useEffect} from 'react';
import { useAuth } from '@/context/AuthContext'
import { getWeatherSuggestions } from '@/api/weather'

export function useSuggestions(){
    
    const { user } = useAuth()
    const [suggestions, setSuggestions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect (() => {
            async function fetchSuggestions(){
                if (user && user.latitude != null){
                    try {
                        const response = await getWeatherSuggestions()
                        setSuggestions(response)
                    } catch (err) {
                        setError(err)
                    }
                }
                setLoading(false)
            }
            fetchSuggestions();
        }, [user])

        return { suggestions, loading, error }
}