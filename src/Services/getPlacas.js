import axios from 'axios'

const API_GENERAL = import.meta.env.VITE_API_PLACA;
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const MAX_NULL_VALUES = 5

export const getPlacas = async ({ zona, oficina, placa }) => {
    try {
        const response = await axios.post(VITE_API_BASE+API_GENERAL, { zona, oficina, placa })
        
        if (countNullValues(response.data) > MAX_NULL_VALUES) {
            throw new Error("Placa no Encontrada")
        }
        
        return response.data
    } catch (error) {
        throw error
    }
}

function countNullValues(data) {
    let nullCount = 0;
    for (const key in data) {
        if (data[key] === null) {
            nullCount++
            if (nullCount > MAX_NULL_VALUES) {
                break
            }
        }
    }
    return nullCount;
}