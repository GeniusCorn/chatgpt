import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json'
  },
  timeout: 120000
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: any) => {
    if (error.message === 'canceled') {
      return await Promise.reject(error)
    }

    alert(error.message)

    return await Promise.reject(error)
  }
)

export default http
