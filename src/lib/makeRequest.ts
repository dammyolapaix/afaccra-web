import axios from 'axios'

export const makeRequest = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})
