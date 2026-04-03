import { useState, useEffect } from 'react'

export function useUKHolidays() {
    const [holidays, setHolidays] = useState([])

    useEffect(() => {
        async function fetchHolidays() {
            try {
                const response = await fetch('https://www.gov.uk/bank-holidays.json')
                const data = await response.json()
                // england-and-wales is the key for that region
                setHolidays(data['england-and-wales'].events)
            } catch (err) {
                console.error('Failed to fetch bank holidays', err)
            }
        }
        fetchHolidays()
    }, []) // empty array = fetch once on mount, never changes

    return { holidays }
}