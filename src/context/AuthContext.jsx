import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  LoginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../Services/auth";

import Cookies from "js-cookie";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  //Metodo iniciar sesion
  const signin = async (_user) => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setErrors(null);
    try {
      const userResponse = await LoginRequest(_user);
      const token = userResponse.token;
      Cookies.set("token", token, { expires: 7 });
      setUser(userResponse);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error);
    }
  };

  //Metodo cerrar sesion
  const logout = async () => {
    const status = await logoutRequest(user.id);
    if (status === "OK") {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      setErrors(null);
      console.log("Sesión cerrada y marcado offline");
    }
  };

    useEffect(() => {
    const checkPIDE = async () => {
      try {
        const responseVerify = await verifyServiceRENIEC();
        if (!responseVerify) return setRENIEC(0);
        setRENIEC(1);
      } catch (error) {
        console.error(error);
      }
    };
    checkPIDE();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const responseVerify = await verifyTokenRequest(cookies.token);
        if (!responseVerify) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(responseVerify);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
