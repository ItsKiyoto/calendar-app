import { apiFetch } from './client'

export const getUser = () => apiFetch('/api/user').then(res => res.json())