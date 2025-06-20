import { useState } from 'react'
import {getAsientos} from '../Services/getAsientos'

export const useAsientos = () =>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axiosAsientos = async ({ zona, oficina, partida }) => {
        try {
            setLoading(true)

            const result = await getAsientos({ zona, oficina, partida })
            setData(result)
            setError(null)
        } catch (error) {
            setData(null)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, axiosAsientos }
}
