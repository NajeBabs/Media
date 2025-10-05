import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi } from "../api/authApi.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Load token from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Call backend login
  async function login(username, password) {
    const res = await loginApi({ username, password });
    setToken(res.data.token);
  }

  // Call backend register
  async function register(userData) {
    return registerApi(userData);
  }

  // Logout clears token
  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
