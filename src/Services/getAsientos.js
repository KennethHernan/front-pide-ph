import axios from 'axios'

const API_GENERAL = import.meta.env.VITE_API_ASIENTOS
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export const getAsientos = async ({ zona, oficina, partida }) => {
    try {
        const response = await axios.post(VITE_API_BASE+API_GENERAL, { zona, oficina, partida })
        return response.data.listarAsientosSIRSARPResponse
    } catch (error) {
        console.log("ERROR ASIENTOS getAsientos");
        throw error
    }
}