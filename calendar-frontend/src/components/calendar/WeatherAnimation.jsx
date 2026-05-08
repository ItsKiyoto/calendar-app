import { getWeatherElements } from '@/utils/weatherUtils'
import { useMemo } from 'react'

const CLOUD_SVGS = {
    white: {
        1: <>
            <svg width="30.281246" height="18.402346" viewBox="0 0 30.281246 18.402347" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="cloud1Gradient">
                        <stop style={{ stopColor: '#f2f9fe', stopOpacity: 1 }} offset="0.59936911" />
                        <stop style={{ stopColor: '#c8e9fb', stopOpacity: 0.21568628 }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#cloud1Gradient" id="cloud1Fill" x1="51.311584" y1="28.757839" x2="51.311584" y2="59.039089" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.6728188,-22.80138)" />
                </defs>
                <g transform="translate(-34.498142,-11.895911)">
                    <path id="rect1" style={{ fill: 'url(#cloud1Fill)' }} d="m 52.793059,11.895911 a 7.9910951,7.9910951 0 0 0 -6.828125,3.839844 5.3624454,5.3624454 0 0 0 -2.425781,-0.580078 5.3624454,5.3624454 0 0 0 -5.361328,5.363281 5.3624454,5.3624454 0 0 0 0.0918,0.992187 c -2.139434,0.309701 -3.771484,2.14123 -3.771484,4.369141 0,2.446537 1.969478,4.417969 4.416015,4.417969 h 21.449219 c 2.446537,0 4.416016,-1.971432 4.416016,-4.417969 0,-2.358609 -1.830597,-4.273577 -4.154297,-4.408203 a 7.9910951,7.9910951 0 0 0 0.158203,-1.583984 7.9910951,7.9910951 0 0 0 -7.990235,-7.992188 z" />
                </g>
            </svg>

        </>,
        2: <>
            <svg width="30.281254" height="19.322266" viewBox="0 0 30.281254 19.322268" xmlns="http://www.w3.org/2000/svg">
                <linearGradient id="cloud2Gradient">
                    <stop style={{ stopColor: '#f2f9fe', stopOpacity: 1 }} offset="0.60000002" />
                    <stop style={{ stopColor: '#c8e9fb', stopOpacity: 0.21568628 }} offset="1" />
                </linearGradient>
                <linearGradient href="#cloud2Gradient" id="cloud2Fill" x1="45.852245" y1="34.186211" x2="45.852245" y2="64.467461" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.7865232,-0.14869923)" />
                <g style={{ display: 'inline' }} transform="translate(-34.498142,-39.517005)">
                    <path style={{ fill: 'url(#cloud2Fill)' }} d="m 45.728612,39.517005 a 6.4537215,6.4537215 0 0 0 -6.453125,6.455078 6.4537215,6.4537215 0 0 0 0.04492,0.771484 h -0.40625 c -2.446537,0 -4.416016,1.969479 -4.416016,4.416016 0,2.442631 1.96319,4.409741 4.404297,4.416015 a 4.8892884,4.8892884 0 0 0 3.998047,2.076172 4.8892884,4.8892884 0 0 0 4,-2.076172 h 0.03516 a 7.0447812,7.0447812 0 0 0 5.945313,3.263672 7.0447812,7.0447812 0 0 0 5.943359,-3.263672 h 1.539063 c 2.446537,0 4.416015,-1.969479 4.416015,-4.416015 0,-2.446537 -1.969478,-4.416016 -4.416015,-4.416016 h -0.19141 a 5.3624454,5.3624454 0 0 0 -5.277344,-4.408203 5.3624454,5.3624454 0 0 0 -3.238281,1.085937 6.4537215,6.4537215 0 0 0 -5.927735,-3.904296 z" />
                </g>
            </svg>

        </>,
        3: <>
            <svg width="33.783199" height="17.228516" viewBox="0 0 33.783199 17.228517" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1"> <linearGradient
                    id="cloud3Gradient">
                    <stop style={{ stopColor: '#f2f9fe', stopOpacity: '1' }} offset="0.60000002" />
                    <stop style={{ stopColor: '#c8e9fb', stopOpacity: '0.21568628' }} offset="1" />
                </linearGradient>
                    <linearGradient href="#cloud3Gradient" id="cloud3Fill" x1="15.329094" y1="39.492249" x2="15.329094" y2="73.275452" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.945407,9.8141264)" />
                </defs>
                <g transform="translate(-13.382901,-57.583724)" style={{ display: 'inline' }}>
                    <path style={{ fill: 'url(#cloud3Fill)' }} d="m 21.998135,57.583724 a 8.6137247,8.6137247 0 0 0 -8.615235,8.615234 8.6137247,8.6137247 0 0 0 6.347657,8.308594 c 0.487369,0.184318 1.01489,0.285156 1.568359,0.285156 h 0.128906 a 8.6137247,8.6137247 0 0 0 0.570313,0.01953 8.6137247,8.6137247 0 0 0 0.568359,-0.01953 h 20.183594 c 2.446537,0 4.416016,-1.969479 4.416016,-4.416016 0,-2.446537 -1.969479,-4.416015 -4.416016,-4.416015 h -2.533203 a 6.0406108,6.0406108 0 0 0 -5.984375,-5.216797 6.0406108,6.0406108 0 0 0 -4.390625,1.894531 8.6137247,8.6137247 0 0 0 -7.84375,-5.054687 z" />
                </g>
                <g style={{ display: 'none' }} transform="translate(-34.498142,-67.546549)">
                    <circle style={{ fill: '#000000', strokeWidth: '1.16806' }} cx="70.069168" cy="87.984741" r="6.263659" />
                </g>
            </svg>
        </>
    },
    grey: {
        1: <>
            <svg width="30.281246" height="18.402346" viewBox="0 0 30.281246 18.402347" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="GreyCloud1Gradient">
                        <stop style={{ stopColor: '#c8d4e0', stopOpacity: '1' }} offset="0.59936911" />
                        <stop style={{ stopColor: '#b0bec5', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#GreyCloud1Gradient" id="GreyCloud1Fill" x1="51.311584" y1="28.757839" x2="51.311584" y2="59.039089" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.6728188,-22.80138)" />
                </defs>
                <g style={{ display: 'inline' }} transform="translate(-34.498142,-11.895911)">
                    <path style={{ fill: 'url(#GreyCloud1Fill)' }} d="m 52.793059,11.895911 a 7.9910951,7.9910951 0 0 0 -6.828125,3.839844 5.3624454,5.3624454 0 0 0 -2.425781,-0.580078 5.3624454,5.3624454 0 0 0 -5.361328,5.363281 5.3624454,5.3624454 0 0 0 0.0918,0.992187 c -2.139434,0.309701 -3.771484,2.14123 -3.771484,4.369141 0,2.446537 1.969478,4.417969 4.416015,4.417969 h 21.449219 c 2.446537,0 4.416016,-1.971432 4.416016,-4.417969 0,-2.358609 -1.830597,-4.273577 -4.154297,-4.408203 a 7.9910951,7.9910951 0 0 0 0.158203,-1.583984 7.9910951,7.9910951 0 0 0 -7.990235,-7.992188 z" />
                </g>
            </svg>
        </>,
        2: <>
            <svg width="30.281254" height="19.322266" viewBox="0 0 30.281254 19.322268" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="GreyCloud2Gradient">
                        <stop style={{ stopColor: '#c8d4e0', stopOpacity: '1' }} offset="0.60000002" />
                        <stop style={{ stopColor: '#b0bec5', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#GreyCloud2Gradient" id="GreyCloud2Fill" x1="45.852245" y1="34.186211" x2="45.852245" y2="64.467461" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.7865232,-0.14869923)" />
                </defs>
                <g style={{ display: 'inline' }} transform="translate(-34.498142,-39.517005)">
                    <path style={{ fill: 'url(#GreyCloud2Fill)' }} d="m 45.728612,39.517005 a 6.4537215,6.4537215 0 0 0 -6.453125,6.455078 6.4537215,6.4537215 0 0 0 0.04492,0.771484 h -0.40625 c -2.446537,0 -4.416016,1.969479 -4.416016,4.416016 0,2.442631 1.96319,4.409741 4.404297,4.416015 a 4.8892884,4.8892884 0 0 0 3.998047,2.076172 4.8892884,4.8892884 0 0 0 4,-2.076172 h 0.03516 a 7.0447812,7.0447812 0 0 0 5.945313,3.263672 7.0447812,7.0447812 0 0 0 5.943359,-3.263672 h 1.539063 c 2.446537,0 4.416015,-1.969479 4.416015,-4.416015 0,-2.446537 -1.969478,-4.416016 -4.416015,-4.416016 h -0.19141 a 5.3624454,5.3624454 0 0 0 -5.277344,-4.408203 5.3624454,5.3624454 0 0 0 -3.238281,1.085937 6.4537215,6.4537215 0 0 0 -5.927735,-3.904296 z" />
                </g>
            </svg>
        </>,
        3: <>
            <svg width="33.783199" height="17.228516" viewBox="0 0 33.783199 17.228517" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="GreyCloud3Gradient">
                        <stop style={{ stopColor: '#c8d4e0', stopOpacity: '1' }} offset="0.60000002" />
                        <stop style={{ stopColor: '#b0bec5', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#GreyCloud3Gradient" id="GreyCloud3Fill" x1="15.329094" y1="39.492249" x2="15.329094" y2="73.275452" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.945407,9.8141264)" />
                </defs>
                <g transform="translate(-13.382901,-57.583724)" style={{ display: 'inline' }}>
                    <path style={{ fill: 'url(#GreyCloud3Fill)' }} d="m 21.998135,57.583724 a 8.6137247,8.6137247 0 0 0 -8.615235,8.615234 8.6137247,8.6137247 0 0 0 6.347657,8.308594 c 0.487369,0.184318 1.01489,0.285156 1.568359,0.285156 h 0.128906 a 8.6137247,8.6137247 0 0 0 0.570313,0.01953 8.6137247,8.6137247 0 0 0 0.568359,-0.01953 h 20.183594 c 2.446537,0 4.416016,-1.969479 4.416016,-4.416016 0,-2.446537 -1.969479,-4.416015 -4.416016,-4.416015 h -2.533203 a 6.0406108,6.0406108 0 0 0 -5.984375,-5.216797 6.0406108,6.0406108 0 0 0 -4.390625,1.894531 8.6137247,8.6137247 0 0 0 -7.84375,-5.054687 z" />
                </g>
                <g style={{ display: 'none' }} transform="translate(-34.498142,-67.546549)">
                    <circle style={{ fill: '#000000', strokeWidth: '1.16806' }} cx="70.069168" cy="87.984741" r="6.263659" />
                </g>
            </svg>
        </>
    },
    dark: {
        1: <>
            <svg width="30.281246" height="18.402346" viewBox="0 0 30.281246 18.402347" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="DarkCloud1Gradient">
                        <stop style={{ stopColor: '#78909c', stopOpacity: '1' }} offset="0.59936911" />
                        <stop style={{ stopColor: '#546e7a', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#DarkCloud1Gradient" id="DarkCloud1Fill" x1="51.311584" y1="28.757839" x2="51.311584" y2="59.039089" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.6728188,-22.80138)" />
                </defs>
                <g style={{ display: 'inline' }} transform="translate(-34.498142,-11.895911)">
                    <path style={{ fill: 'url(#DarkCloud1Fill)' }} d="m 52.793059,11.895911 a 7.9910951,7.9910951 0 0 0 -6.828125,3.839844 5.3624454,5.3624454 0 0 0 -2.425781,-0.580078 5.3624454,5.3624454 0 0 0 -5.361328,5.363281 5.3624454,5.3624454 0 0 0 0.0918,0.992187 c -2.139434,0.309701 -3.771484,2.14123 -3.771484,4.369141 0,2.446537 1.969478,4.417969 4.416015,4.417969 h 21.449219 c 2.446537,0 4.416016,-1.971432 4.416016,-4.417969 0,-2.358609 -1.830597,-4.273577 -4.154297,-4.408203 a 7.9910951,7.9910951 0 0 0 0.158203,-1.583984 7.9910951,7.9910951 0 0 0 -7.990235,-7.992188 z" />
                </g>
            </svg>

        </>,
        2: <>
            <svg width="30.281254" height="19.322266" viewBox="0 0 30.281254 19.322268" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="DarkCloud2Gradient">
                        <stop style={{ stopColor: '#78909c', stopOpacity: '1' }} offset="0.60000002" />
                        <stop style={{ stopColor: '#546e7a', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#DarkCloud2Gradient" id="DarkCloud2Fill" x1="45.852245" y1="34.186211" x2="45.852245" y2="64.467461" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.7865232,-0.14869923)" />
                </defs>
                <g style={{ display: 'inline' }} transform="translate(-34.498142,-39.517005)">
                    <path style={{ fill: 'url(#DarkCloud2Fill)' }} d="m 45.728612,39.517005 a 6.4537215,6.4537215 0 0 0 -6.453125,6.455078 6.4537215,6.4537215 0 0 0 0.04492,0.771484 h -0.40625 c -2.446537,0 -4.416016,1.969479 -4.416016,4.416016 0,2.442631 1.96319,4.409741 4.404297,4.416015 a 4.8892884,4.8892884 0 0 0 3.998047,2.076172 4.8892884,4.8892884 0 0 0 4,-2.076172 h 0.03516 a 7.0447812,7.0447812 0 0 0 5.945313,3.263672 7.0447812,7.0447812 0 0 0 5.943359,-3.263672 h 1.539063 c 2.446537,0 4.416015,-1.969479 4.416015,-4.416015 0,-2.446537 -1.969478,-4.416016 -4.416015,-4.416016 h -0.19141 a 5.3624454,5.3624454 0 0 0 -5.277344,-4.408203 5.3624454,5.3624454 0 0 0 -3.238281,1.085937 6.4537215,6.4537215 0 0 0 -5.927735,-3.904296 z" />
                </g>
            </svg>

        </>,
        3: <>
            <svg width="33.783199" height="17.228516" viewBox="0 0 33.783199 17.228517" xmlns="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="DarkCloud3Gradient">
                        <stop style={{ stopColor: '#78909c', stopOpacity: '1' }} offset="0.60000002" />
                        <stop style={{ stopColor: '#546e7a', stopOpacity: '0.21568628' }} offset="1" />
                    </linearGradient>
                    <linearGradient href="#DarkCloud3Gradient" id="DarkCloud3Fill" x1="15.329094" y1="39.492249" x2="15.329094" y2="73.275452" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.945407,9.8141264)" />
                </defs>
                <g transform="translate(-13.382901,-57.583724)" style={{ display: 'inline' }}>
                    <path style={{ fill: 'url(#DarkCloud3Fill)' }} d="m 21.998135,57.583724 a 8.6137247,8.6137247 0 0 0 -8.615235,8.615234 8.6137247,8.6137247 0 0 0 6.347657,8.308594 c 0.487369,0.184318 1.01489,0.285156 1.568359,0.285156 h 0.128906 a 8.6137247,8.6137247 0 0 0 0.570313,0.01953 8.6137247,8.6137247 0 0 0 0.568359,-0.01953 h 20.183594 c 2.446537,0 4.416016,-1.969479 4.416016,-4.416016 0,-2.446537 -1.969479,-4.416015 -4.416016,-4.416015 h -2.533203 a 6.0406108,6.0406108 0 0 0 -5.984375,-5.216797 6.0406108,6.0406108 0 0 0 -4.390625,1.894531 8.6137247,8.6137247 0 0 0 -7.84375,-5.054687 z" />
                </g>
                <g style={{ display: 'none' }} transform="translate(-34.498142,-67.546549)">
                    <circle style="fill:#000000;stroke-width:1.16806" id="circle9-8" cx="70.069168" cy="87.984741" r="6.263659" />
                </g>
            </svg>
        </>
    }
}

const getCloudSVG = (type, variant) => CLOUD_SVGS[type]?.[variant]

export default function WeatherAnimation({ description }) {
    const elements = getWeatherElements(description)

    const cloudVariants = useMemo(() => ({
        primary: {
            variant: Math.floor(Math.random() * 3) + 1,
            top: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
            delay: 0
        },
        secondary: {
            variant: Math.floor(Math.random() * 3) + 1,
            top: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
            delay: -(Math.floor(Math.random() * (6 - 3 + 1)) + 3)
        },
        tertiary: {
            variant: Math.floor(Math.random() * 3) + 1,
            top: Math.floor(Math.random() * (20 - 5 + 1)) + 5,
            delay: -(Math.floor(Math.random() * (12 - 7 + 1)) + 9)
        },
    }), [description])

    
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

            {/* Sun */}
            {elements.sun && (
                <svg className="weather-sun" width="21.263931" height="21.263941" viewBox="0 0 21.263931 21.263943" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(-72.118959,-12.342008)">
                        <circle style={{ fill: '#ffff4b', fillOpacity: 1 }} cx="82.750923" cy="22.973978" r="10.631969" />
                    </g>
                </svg>

            )}

            {/* Cloud layer 1 - always shown if cloud exists */}
            {elements.cloud && (
                <div
                    className={`weather-cloud weather-cloud--${elements.cloudType} weather-cloud--primary ${elements.cloudMoving ? 'weather-cloud--moving' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        top: `${cloudVariants.primary.top}px`,
                        animationDelay: `${cloudVariants.primary.delay}s`
                    }}>
                    {getCloudSVG(elements.cloudType, cloudVariants.primary.variant)}
                </div>
            )}

            {/* Cloud layer 2 - shown for partly cloudy and above */}
            {elements.cloudCount >= 2 && (
                <div
                    className={`weather-cloud weather-cloud--${elements.cloudType} weather-cloud--secondary ${elements.cloudMoving ? 'weather-cloud--moving' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        top: `${cloudVariants.secondary.top}px`,
                        animationDelay: `${cloudVariants.secondary.delay}s`
                    }}>
                    {getCloudSVG(elements.cloudType, cloudVariants.secondary.variant)}
                </div>
            )}

            {/* Cloud layer 3 - shown for overcast and above */}
            {elements.cloudCount >= 3 && (
                <div
                    className={`weather-cloud weather-cloud--${elements.cloudType} weather-cloud--tertiary ${elements.cloudMoving ? 'weather-cloud--moving' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        top: `${cloudVariants.tertiary.top}px`,
                        animationDelay: `${cloudVariants.tertiary.delay}s`
                    }}>
                    {getCloudSVG(elements.cloudType, cloudVariants.tertiary.variant)}
                </div>
            )}

            {/* Particles */}
            {elements.particles && (
                <div className={`weather-particles weather-particles--${elements.particles}`} />
            )}

        </div>
    )
}