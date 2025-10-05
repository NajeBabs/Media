import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function getAuthHeaders() {
  const token = localStorage.getItem("token"); // 👈 get from localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getMediaItems() {
  return axios.get(`${API_URL}/api/MediaItems`, {
    headers: getAuthHeaders(),
  });
}

export async function getMediaItemById(id) {
  return axios.get(`${API_URL}/api/MediaItems/${id}`, {
    headers: getAuthHeaders(),
  });
}

export async function addMediaItem(data) {
  return axios.post(`${API_URL}/api/MediaItems`, data, {
    headers: getAuthHeaders(),
  });
}

export async function updateMediaItem(id, data) {
  return axios.put(`${API_URL}/api/MediaItems/${id}`, data, {
    headers: getAuthHeaders(),
  });
}

export async function deleteMediaItem(id) {
  return axios.delete(`${API_URL}/api/MediaItems/${id}`, {
    headers: getAuthHeaders(),
  });
}
