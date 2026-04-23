// import client from './client'
import { apiFetch } from './client'

export const getWeather = () => apiFetch('/api/weather').then(res => res.json())

export const getWeatherSuggestions = () => apiFetch('/api/weather/suggestions').then(res => res.json())

export const updateLocation = (lat, lng) => apiFetch('/api/user/location', {
  method : 'PATCH',
  body : JSON.stringify({Latitiude: lat, Longitude: lng})
}).then(res => res.json())


