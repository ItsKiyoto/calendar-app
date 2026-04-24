// import client from './client'
import { apiFetch } from './client'

export const getWeather = () => apiFetch('/api/weather').then(res => res.json())

export const getWeatherSuggestions = () => apiFetch('/api/weather/suggestions').then(res => res.json())

export const updateLocation = (lat, lng, city) => apiFetch('/api/user/location', {
  method: 'PATCH',
  body: JSON.stringify({ Latitude: lat, Longitude: lng, City: city })
}).then(res => {
  if (res.status === 204) return {};
  return res.json();
})




