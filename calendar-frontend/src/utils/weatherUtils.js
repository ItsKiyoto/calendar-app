export function getWeatherBackground(description) {
  const map = {
    'Clear Sky': '#ACEAFF', //no clouds
    'Mainly Clear': '#ACEAFF', //clouds moving
    'Partly Cloudy': '#dde6df',  // old colour'#e8f3f5', //clouds moving
    'Overcast': '#c8cfd0',// '#000000',//'#e2e8f0', //clouds stationary 
    'Foggy': '#e8e4de',//old colour'#f1f0ef', // cloud with white bars moving left and right
    'Freezing Fog': '#e8e4de', // old '#f1f0ef', // ^^ with snow flakes on the edge of the cell appearing and disappearing.
    'Drizzle': '#bbbec0',//'#000000',//'#e0e7ef', //2 white clouds small drops
    'Freezing Drizzle': '#bbbec0',//old '#e0e7ef', //2 white clouds small drops with random snow balls
    'Rainy': '#afbec9',//'#000000',//'#dbeafe', //2 grey clouds with large drops
    'Freezing Rain': '#afbec9',//old '#dbeafe', //2 grey clouds with large drops and snow balls
    'Snowy': '#e4ecf0',//old'#f0f9ff', //2 white clouds with snow flakes falling down 
    'Snow Grains': '#e4ecf0',//old'#f0f9ff', //2 white clouds with snow balls falling with a streak behind it
    'Showers': '#afbec9',//old'#bfdbfe', //1 grey cloud rain falling fast
    'Snow Showers': '#e4ecf0', //old: '#f0f9ff',//1 white cloud with snow falling fast
    'Thunderstorm': '#d4cfe0', //old: '#e9d5ff ', //dark cloud with rain falling fast and random lightning
    'Thunderstorm with Hail': '#d4cfe0',//old:'#e9d5ff ' //dark cloud with rain and snow balls 
  }

  return map[description] ?? '#ffffff'
}

export function getTempColour(temp) {
  if (temp >= 0) {
    const factor = (+temp) / 40 // 0 = cold blue, 1 = hot red
    return interpolateColour('#ffaeae', '#ff0000', factor)
  } else {
    const factor = (-temp) / 10 // 0 = cold blue, 1 = hot red
    return interpolateColour('#ffffff', '#1984ff ', factor)
  }
}

export function getPrecipColour(percent) {
  const factor = (percent - 0) / 100
  return interpolateColour('#5dc6ff', '#0f2b4e', factor)
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

export function getSeverityInfo(level) {
  switch (level) {
    case 0: return { label: 'Info', colour: 'text-blue-500', symbol: 'ℹ️' }
    case 1: return { label: 'Warning', colour: 'text-amber-500', symbol: '⚠️' }
    case 2: return { label: 'Danger', colour: 'text-red-500', symbol: '🚨' }
    default: return { label: 'Info', colour: 'text-blue-500', symbol: 'ℹ️' }
  }
}

// export function getWeatherAnimation(description) {
//   const map = {
//     'Clear Sky': 'weather-sunny',
//     'Mainly Clear': 'weather-mainly-clear',
//     'Partly Cloudy': 'weather-partly-cloudy',
//     'Overcast': 'weather-sunny weather-mainly-clear',
//     'Foggy': 'weather-foggy',
//     'Freezing Fog': 'weather-freezing-fog',
//     'Drizzle': 'weather-drizzle',
//     'Freezing Drizzle': 'weather-freezing-drizzle',
//     'Rainy': 'weather-rainy',
//     'Freezing Rain': 'weather-freezing-rain',
//     'Snowy': 'weather-snowy',
//     'Snow Grains': 'weather-snow-grains',
//     'Showers': 'weather-showers',
//     'Snow Showers': 'weather-snow-showers',
//     'Thunderstorm': 'weather-thunderstorm',
//     'Thunderstorm with Hail': 'weather-thunderstorm-hail'
//   }
//   return map[description] ?? ''
// }

export function getWeatherElements(description) {
    const map = {
        'Clear Sky':              { sun: true,  cloud: false, cloudCount: 0, cloudType: 'white', cloudMoving: false, particles: null },
        'Mainly Clear':           { sun: true,  cloud: true,  cloudCount: 1, cloudType: 'white', cloudMoving: true, particles: null },
        'Partly Cloudy':          { sun: false, cloud: true,  cloudCount: 2, cloudType: 'white', cloudMoving: true, particles: null },
        'Overcast':               { sun: false, cloud: true,  cloudCount: 3, cloudType: 'white', cloudMoving: false, particles: null },
        'Foggy':                  { sun: false, cloud: false, cloudCount: 0, cloudType: null,    cloudMoving: false, particles: 'fog' },
        'Freezing Fog':           { sun: false, cloud: false, cloudCount: 0, cloudType: null,    cloudMoving: false, particles: 'fog' },
        'Drizzle':                { sun: false, cloud: true,  cloudCount: 1, cloudType: 'grey',  cloudMoving: false, particles: 'drizzle' },
        'Freezing Drizzle':       { sun: false, cloud: true,  cloudCount: 2, cloudType: 'grey',  cloudMoving: false, particles: 'drizzle' },
        'Rainy':                  { sun: false, cloud: true,  cloudCount: 2, cloudType: 'grey',  cloudMoving: false, particles: 'rain' },
        'Freezing Rain':          { sun: false, cloud: true,  cloudCount: 2, cloudType: 'grey',  cloudMoving: false, particles: 'rain' },
        'Snowy':                  { sun: false, cloud: true,  cloudCount: 2, cloudType: 'white', cloudMoving: false, particles: 'snow' },
        'Snow Grains':            { sun: false, cloud: true,  cloudCount: 0, cloudType: 'white', cloudMoving: false, particles: 'snow' },
        'Showers':                { sun: false, cloud: true,  cloudCount: 0, cloudType: 'dark',  cloudMoving: false, particles: 'rain' },
        'Snow Showers':           { sun: false, cloud: true,  cloudCount: 0, cloudType: 'white', cloudMoving: false, particles: 'snow' },
        'Thunderstorm':           { sun: false, cloud: true,  cloudCount: 0, cloudType: 'dark',  cloudMoving: false, particles: 'rain' },
        'Thunderstorm with Hail': { sun: false, cloud: true,  cloudCount: 0, cloudType: 'dark',  cloudMoving: false, particles: 'hail' },
    }
    return map[description] ?? { sun: false, cloud: false, cloudType: null, particles: null }
}
