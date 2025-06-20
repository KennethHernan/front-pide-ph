import { useState } from "react";
import { getPlacas } from "../Services/getPlacas";
import { useAuth } from "../context/AuthContext";

export const usePLaca = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, createAudit } = useAuth(); //AÑADIDO
  const username = user.username;

  const axiosPlacas = async ({ zona, oficina, placa }) => {
    try {
      setLoading(true);
      const result = await getPlacas({ zona, oficina, placa });

      const metodo = `/api/v1/user/getPlaca: ${placa} , ${result.sede}`;
      const audit = { username, metodo };
      await createAudit(audit);

      setData(result);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, axiosPlacas };
};
