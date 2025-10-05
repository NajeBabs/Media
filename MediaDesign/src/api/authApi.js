import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Register a new fan
export async function register(fanData) {
  return axios.post(`${API_URL}/auth/register`, fanData);
}

// Login existing fan
export async function login(credentials) {
  return axios.post(`${API_URL}/auth/login`, credentials);
}
