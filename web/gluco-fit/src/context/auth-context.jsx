/* eslint-disable react-refresh/only-export-components */
import { useState, createContext } from "react";
import * as AuthService from "../services/auth-service/auth-service"

export const LS_USER_KEY = "current-user";
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem(LS_USER_KEY)
      ? JSON.parse(localStorage.getItem(LS_USER_KEY))
      : undefined
  );

  const login = (user) => {
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    try {
      await AuthService.logout(); // <- esto es lo que faltaba
    } catch (error) {
      console.error("Error cerrando sesión", error);
    } finally {
      // Limpiamos el estado local pase lo que pase con la API,
      // para que el usuario nunca se quede "atascado" visualmente
      // logueado si la petición fallara por lo que sea.
      localStorage.removeItem(LS_USER_KEY);
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
