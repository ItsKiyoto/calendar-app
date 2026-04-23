import { apiFetch } from './client'

export const getEvents = () => apiFetch('/api/events').then(res => res.json())

export const createEvent = (data) => apiFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(data)
}).then(res => res.json())

export const updateEvent = (id, data) => apiFetch(`/api/events/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
})

export const deleteEvent = (id) => apiFetch(`/api/events/${id}`, { method: 'DELETE' })
