import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: VITE_API_BASE+API_URL
})

export const axiosDniInfo = async (dni) => {
  try {
    const response = await api.get(`/${dni}`)
    return response.data
  } catch (error) {
    throw error
  }
};
