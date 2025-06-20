import { useState } from "react";
import { getJuridica } from "../Services/getDominio";
import { useAuth } from "../context/AuthContext";

export const useJuridica = () => {
  const [dataJuridica, setData] = useState(null);
  const [loadingj, setLoadingj] = useState(false);
  const [errorj, setErrorj] = useState(null);
  const { user, createAudit } = useAuth(); //AÑADIDO
  const username = user.username;

  const axiosJuridica = async (razonSocial) => {
    try {
      setLoadingj(true);
      const result = await getJuridica(razonSocial);
      setData(result);
      setErrorj(null);

      // guardar nombre y consulta getPlaca
      const metodo = `/api/v1/user/getJuridica: ${razonSocial}`;
      const audit = { username, metodo };
      await createAudit(audit);
    } catch (error) {
      console.log("2");
      setData(error);
      setErrorj(error.message);
    } finally {
      setLoadingj(false);
    }
  };
  return { dataJuridica, axiosJuridica, loadingj, errorj };
};
