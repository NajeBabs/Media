import { useState } from "react"
import Input from "../Input.jsx"
import Select from "../Select.jsx"
import { addMediaItem } from "../../api/mediaApi.js"
import { cleanGenres, validateMedia } from "../utils/mediaValidation.jsx"
import { toast } from "react-toastify"

export default function AddMediaModal({ onClose, onSuccess }) {
  const [status, setStatus] = useState("0") // default: Plan To Watch
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const form = new FormData(e.target)
    const payload = {
      title: form.get("title"),
      yearReleased: Number(form.get("yearReleased")),
      genres: form.get("genres") ? cleanGenres(form.get("genres")) : "",
      mediaType: Number(form.get("mediaType")),
      status: Number(form.get("status")),
      rating: form.get("rating") ? Number(form.get("rating")) : null,
    }

    const errorsObj = validateMedia(payload)
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj)
      setSaving(false)
      return
    }

    try {
      await addMediaItem(payload)
      toast.success("✅ Media added successfully!") // success toast
      onSuccess?.() // refresh list if parent passed it
      e.target.reset()
      setStatus("0")
      setErrors({})
      setApiError("")
    } catch (err) {
      console.error("❌ Error saving:", err)
      toast.error("❌ Failed to save media item") // error toast
      setApiError("Failed to save media item. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white backdrop-blur-md w-96 rounded-xl p-6 shadow-lg border border-white/40">
        <h2 className="text-lg font-bold text-center mb-4 text-gray-800">Add New Media</h2>

        {/* API error banner (fallback if API fails silently) */}
        {apiError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <Input name="title" placeholder="Enter title..." />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <Input name="yearReleased" type="number" placeholder="2024" required />
          {errors.yearReleased && <p className="text-red-500 text-sm">{errors.yearReleased}</p>}

          <Input name="genres" placeholder="Action, Drama" />
          {errors.genres && <p className="text-red-500 text-sm">{errors.genres}</p>}

          <Select name="mediaType" defaultValue="0">
            <option value="0">Movie</option>
            <option value="1">TV Series</option>
            <option value="2">Anime</option>
          </Select>

          <Select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="0">Planned</option>
            <option value="1">Watching</option>
            <option value="2">Watched</option>
            <option value="3">Dropped</option>
          </Select>

          {status !== "0" && (
            <Input
              name="rating"
              type="number"
              placeholder="1–10"
              min="1"
              max="10"
            />
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
