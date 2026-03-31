export function getWeatherBackground(description) {
  const map = {
    'Clear Sky': '#fef3c7',
    'Mainly Clear' : '#dbd0a1',
    'Partly Cloudy' : '#f5f0e8',
    'Overcast' : '#e2e8f0',
    'Foggy' : '#f1f0ef',
    'Freezing Fog' : '#f1f0ef',
    'Drizzle' : '#e0e7ef',
    'Freezing Drizzle' : '#e0e7ef',
    'Rainy' : '#dbeafe',
    'Freezing Rain' : '#dbeafe',
    'Snowy' : '#f0f9ff',
    'Snow Grains' : '#f0f9ff',
    'Showers' : '#bfdbfe',
    'Snow Showers' : '#f0f9ff',
    'Thunderstorm' : '#e9d5ff ',
    'Thunderstorm with Hail' : '#e9d5ff '
    }

  return map[description] ?? '#ffffff'
}

export function getTempColour(temp) {
  if (temp >= 0){
    const factor = (+temp) / 40 // 0 = cold blue, 1 = hot red
    return interpolateColour('#ffffff', '#ef4444', factor)
  } else {
    const factor = (-temp) / 10 // 0 = cold blue, 1 = hot red
    return interpolateColour('#ffffff', '#51a2ff ', factor)
  }
}

export function getPrecipColour(percent) {
    const factor = (percent - 0) / 100
    return interpolateColour('#bae6fd', '#1e3a5f', factor)
}

export function getWindColour(speed) {
  const factor = (speed - 0) / 80
  return interpolateColour('#d1d5db', '#374151', factor)
}

function interpolateColour(colour1, colour2, factor) {
  const f = Math.max(0, Math.min(1, factor))
  const r1 = parseInt(colour1.slice(1, 3), 16)
  const g1 = parseInt(colour1.slice(3, 5), 16)
  const b1 = parseInt(colour1.slice(5, 7), 16)
  const r2 = parseInt(colour2.slice(1, 3), 16)
  const g2 = parseInt(colour2.slice(3, 5), 16)
  const b2 = parseInt(colour2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * f)
  const g = Math.round(g1 + (g2 - g1) * f)
  const b = Math.round(b1 + (b2 - b1) * f)
  return `rgb(${r}, ${g}, ${b})`
}