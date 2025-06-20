import axios from "axios";

const API_GENERAL = import.meta.env.VITE_API_BASE;
const VITE_API_PROVINCIA = import.meta.env.VITE_API_OFICINA;

const ProvinciasService = {
  getProvincias: async () => {
    try {
      const response = await axios.get(API_GENERAL+VITE_API_PROVINCIA)
      return response.data.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
    } catch (error) {
      throw error
    }
  },
};

export default ProvinciasService;
