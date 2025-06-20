import { useState } from "react";
import { getNatural } from "../Services/getDominio";
import { useAuth } from "../context/AuthContext";

export const useNatural = () => {
  const [dataNatural, setData] = useState(null);
  const [loadingn, setLoadinng] = useState(false);
  const [errorn, setErrorn] = useState(null);
  const { user, createAudit } = useAuth(); //AÑADIDO
  const username = user.username;

  const fechNatural = async (apellidoPaterno, apellidoMaterno, nombres) => {
    try {
      setLoadinng(true);
      const result = await getNatural(
        apellidoPaterno,
        apellidoMaterno,
        nombres
      );
      setData(result);
      setErrorn(null);

      // guardar nombre y consulta getPlaca
      const metodo = `/api/v1/user/getNatural: ${apellidoPaterno} ${apellidoMaterno},${nombres}`;
      const audit = { username, metodo };
      await createAudit(audit);
    } catch (error) {
      setData(error);
      setErrorn(error.message);
    } finally {
      setLoadinng(false);
    }
  };
  return { dataNatural, fechNatural, loadingn, errorn };
};
