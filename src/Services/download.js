import axios from "axios";

const API_GENERAL = import.meta.env.VITE_API_IMG;
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export const downloadImg = async ({
  transaccion,
  idImg,
  tipo,
  nroTotalPag,
  nroPagRef,
  pagina,
}) => {
  try {
    const response = await axios.post(VITE_API_BASE+API_GENERAL, {
      transaccion: transaccion,
      idImg: idImg,
      tipo: tipo,
      nroTotalPag: nroTotalPag,
      nroPagRef: nroPagRef,
      pagina: pagina,
    });

    if (countNullValues(response.data) > MAX_NULL_VALUES) {
      throw new Error("No Encontrada");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
