import { apiFetch } from './client'

export const register = (data) => apiFetch('/api/auth/register', { 
    method: 'POST', 
    body: JSON.stringify(data) 
}).then(res => res.json())

export const login = (data) => apiFetch('/api/auth/login', { 
    method: 'POST', 
    body: JSON.stringify(data) 
}).then(res => res.json())