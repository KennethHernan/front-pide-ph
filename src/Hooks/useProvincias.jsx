import { useEffect, useState } from 'react'
import provinciasService from '../Services/getProvincias'

const useProvincias = () => {
  const [provincias, setProvincias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const axiosProvincias = async () => {
      try {
        const data = await provinciasService.getProvincias()
        setProvincias(data);
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    };

    axiosProvincias();
  }, [])

  return { provincias, loading, error }
};

export default useProvincias;