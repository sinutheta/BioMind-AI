import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('meditwin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('meditwin_token')
      localStorage.removeItem('meditwin_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authApi = {
  register: (data: { email: string; name: string; password: string }) =>
    api.post('/api/auth/register', data).then(r => r.data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data).then(r => r.data),
}

export const predictApi = {
  predict: (data: any) =>
    api.post('/api/predict', data).then(r => r.data),
}

export const historyApi = {
  getHistory: () => api.get('/api/history').then(r => r.data),
  getDetail:  (id: number) => api.get(`/api/history/${id}`).then(r => r.data),
}