import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: any) => {
    return await Promise.reject(error)
  }
)

export default http
