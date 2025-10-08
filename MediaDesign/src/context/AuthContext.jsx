// keeps track of whether the user is logged in, what their token is, and how to log in or out.
import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi } from "../api/authApi.js";

// creates a container that will hold your authentication data (like token, login, logout)
const AuthContext = createContext();

//The <AuthProvider> wraps your whole React app (in App.jsx or main.jsx).
// Everything inside {children} (your pages) can now use the authentication state and functions.
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Load token from localStorage on refresh
  // keeps user logged in on page refresh
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
