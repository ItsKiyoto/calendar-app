import { ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useWeather } from '@/hooks/useWeather'
import { useSuggestions } from '@/hooks/useSuggestions'


export default function ProfilePanel({ user, onClose, profileOpen, onChangeLocation, handleRefresh }) {

    return (
        <div className="w-96 shrink-0 bg-card rounded-2xl shadow-sm p-4 flex flex-col gap-3 overflow-hidden"
            style={{
                height: 'auto',
                maxHeight: 'calc(100vh - 96px)',
            }}>
            <div>
                <h2 className="text-2xl font-semibold font-serif border-b border-border mb-2">Hi, {user.displayName}</h2>
                <span>Current location: {user.city}</span>
            </div>
            <div className='flex justify-between'>
                <Button onClick={() => onChangeLocation()}>Change location</Button>
                <Button variant="outline" onClick={() => handleRefresh()} >Refresh Weather Data</Button>
            </div>

            <button onClick={onClose}
                className="flex flex-col items-center gap-1 w-full py-2 text-gray-400 hover:text-gray-600 transition-colors">
                <span className="text-xs uppercase tracking-wide">
                    Close
                </span>
                <ChevronUp className="w-4 h-4" />
            </button>
        </div>

    )
}
