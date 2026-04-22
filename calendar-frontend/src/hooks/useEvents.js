import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext'
import { getEvents } from '@/api/events'

export function useEvents() {

    const { user } = useAuth()
    const [events, setEvents] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEvents = useCallback(async () => {
        if (!user) return
        try {
            const response = await getEvents()
            setEvents(response)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        fetchEvents();
    }, [user])

    return { events, loading, error, refetch: fetchEvents }
}