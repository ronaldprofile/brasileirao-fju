import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fju-api.vercel.app/api',
})
