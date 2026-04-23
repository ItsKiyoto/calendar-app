import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'
import { getWeatherSuggestions } from '@/api/weather'

export function useSuggestions() {

    const { user } = useAuth()
    const [suggestions, setSuggestions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchSuggestions() {
            const suggestionsCache = localStorage.getItem('suggestions')
            const suggestionsTime = localStorage.getItem('suggestionsTime')
            if (user && user.latitude != null) {
                if (suggestionsCache && Date.now() - suggestionsTime < 3600000) {
                    setSuggestions(JSON.parse(suggestionsCache))
                } else {
                    try {
                        const response = await getWeatherSuggestions()
                        setSuggestions(response)
                        localStorage.setItem('suggestions', JSON.stringify(response))
                        localStorage.setItem('suggestionsTime', Date.now())
                    } catch (err) {
                        setError(err)
                    }
                }
            }
            setLoading(false)
        }
        fetchSuggestions();
    }, [user])

    return { suggestions, loading, error }
}