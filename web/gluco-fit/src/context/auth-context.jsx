import { useState } from 'react';
import { createContext } from 'react';

export const LS_USER_KEY = 'current-user';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem(LS_USER_KEY) ?
      JSON.parse(localStorage.getItem(LS_USER_KEY)) :
      undefined
  );

  const login = (user) => {
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem(LS_USER_KEY);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}; 