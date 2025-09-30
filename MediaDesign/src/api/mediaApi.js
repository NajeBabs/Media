import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5077/api"
})

// POST new media item
export function addMediaItem(payload) {
  return api.post("/MediaItems", payload)
}

export function getMediaItems() {
  return api.get("/MediaItems")
}

export function deleteMediaItem(id) {
  return api.delete(`/MediaItems/${id}`)
}

// Get single item by id
export function getMediaItemById(id) {
  return api.get(`/MediaItems/${id}`)
}

// Update item
export function updateMediaItem(id, payload) {
  return api.put(`/MediaItems/${id}`, payload)
}
