import { useState } from "react";
import { axiosDniInfo } from "../Services/getDniInfo";
import { useAuth } from "../context/AuthContext";

export const useDni = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, createAudit } = useAuth(); //AÑADIDO
  const username = user.username;

  const axiosData = async (dni) => {
    try {
      setLoading(true);
      const result = await axiosDniInfo(dni);
      setData(result);
      setError(null);
      if (!dni) {
        setData(null);
        setError(error.message);
        return;
      }

      // guardar nombre y consulta getPlaca
      const metodo = `/api/v1/user/getDni: ${dni}`;
      const audit = { username, metodo };
      await createAudit(audit);
    } catch (error) {
      setData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, axiosData };
};
