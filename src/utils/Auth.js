import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [Authenticated, setAuthenticated] = useState(true); //set to true for dev purposes

  const login = () => {
    setAuthenticated(true);
  }

  const logout = () => {
    setAuthenticated(false);
  }
  
  return (
    <AuthContext.Provider value={{ Authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}