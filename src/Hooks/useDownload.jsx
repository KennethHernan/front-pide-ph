import { useState } from 'react'
import { downloadImg } from '../Services/download'

export const useDownloadImg = () =>{
    const [dataImg, setDataImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axiosDownloadImg = async ({ transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina  }) => {
        try {
            setLoading(true)

            const result = await downloadImg({ transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina  })
            //console.log("hook: ", result)
            setDataImg(result)
            setError(null)
        } catch (error) {
            setDataImg(null)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { dataImg, loading, error, axiosDownloadImg }
}
