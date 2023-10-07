import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const LoginForm = (props) => {

  return(
    <form>
      <h1>Login</h1>
      <input type='text' placeholder='Email'/>
      <input type='password' placeholder='Password'/>
      <button>Click</button>
    </form>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [Authenticated, setAuthenticated] = useState(true); //set to true for dev purposes

  const login = (prop) => {
    setAuthenticated(prop);
    return true;
  }

  const logout = () => {
    setAuthenticated(false);
    return false;
  }
  
  return (
    <AuthContext.Provider value={{ Authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};