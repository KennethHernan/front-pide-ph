
const API_URL_NATURAL = import.meta.env.VITE_API_NATURAL;
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export const getNatural = async (apellidoPaterno,apellidoMaterno,nombres)=>{
    try{
       const params = {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({apellidoPaterno,apellidoMaterno,nombres})
       }
       const response = await fetch(VITE_API_BASE+API_URL_NATURAL,params)
       const data = await response.json()
       return data
    }catch(error){
        throw error
    }
}


const API_URL_JURIDICA = import.meta.env.VITE_API_URL_JURIDICA

export const getJuridica = async (razonSocial)=>{
    try{
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({razonSocial})
        }
        const response = await fetch(VITE_API_BASE+API_URL_JURIDICA, params)
        const data = await response.json()
        return data
    }catch(error){
        throw error
    }
}