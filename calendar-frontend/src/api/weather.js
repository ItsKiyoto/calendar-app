import client from './client'

export const getWeather = () => client.get('/api/weather')
export const getWeatherSuggestions = () => client.get('/api/weather/suggestions')
export const updateLocation = (lat, lng) =>
  client.patch('/api/user/location', { Latitude: lat, Longitude: lng })
