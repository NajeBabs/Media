import { useState } from "react"
import Input from "../Input.jsx"
import Select from "../Select.jsx"
import Button from "../Button.jsx"
import { addMediaItem } from "../../api/mediaApi.js"

export default function AddMediaModal({ onClose, onSuccess }) {
  const [status, setStatus] = useState("0") // default: Plan To Watch
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const form = new FormData(e.target)
    const payload = {
      title: form.get("title"),
      yearReleased: Number(form.get("yearReleased")),
      genres: form.get("genres"),
      mediaType: Number(form.get("mediaType")),
      status: Number(form.get("status")),
      rating: form.get("rating") ? Number(form.get("rating")) : null,
    }

    try {
      await addMediaItem(payload)
      onSuccess()
      e.target.reset()
      setStatus("0")
    } catch (err) {
      console.error("❌ Error saving:", err)
      alert("Failed to save media item. Check console for details.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white backdrop-blur-md w-96 rounded-xl p-6 shadow-lg border border-white/40">
        <h2 className="text-lg font-bold text-center mb-4 text-gray-800">Add New Media</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="title" placeholder="Enter title..." required />
          <Input name="yearReleased" type="number" placeholder="2024" required />
          <Input name="genres" placeholder="Action, Drama" />

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
            <option value="0">Plan To Watch</option>
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
                <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
                >
                    Cancel
                </Button>
            </div>
        </form>
      </div>
    </div>
  )
}
