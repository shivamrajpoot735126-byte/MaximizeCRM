import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api' })
api.interceptors.request.use(config => {
  const token = localStorage.getItem('maximize_access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export async function login(username, password) {
  const { data } = await api.post('/token/', { username, password })
  localStorage.setItem('maximize_access', data.access)
  localStorage.setItem('maximize_refresh', data.refresh)
  return data
}
export async function getMe() { return (await api.get('/auth/me/')).data }
export default api
