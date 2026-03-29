import client from './client'

export const getEvents = () => client.get('/api/events')
export const createEvent = (data) => client.post('/api/events', data)
export const updateEvent = (id, data) => client.patch(`/api/events/${id}`, data)
export const deleteEvent = (id) => client.delete(`/api/events/${id}`)