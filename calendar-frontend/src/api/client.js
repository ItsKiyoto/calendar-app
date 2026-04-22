const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:7289'

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => null)
    const error = new Error('API error')
    error.status = response.status
    error.data = errorBody
    throw error
  }
  return response
}

export default apiFetch