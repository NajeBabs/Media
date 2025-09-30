import { useState } from "react"
import Input from "../components/Input.jsx"
import Select from "../components/Select.jsx"
import Button from "../components/Button.jsx"
import { addMediaItem } from "../api/mediaApi.js"

export default function AddPage() {
  const [status, setStatus] = useState("0") // default: Plan To Watch
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

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
      const res = await addMediaItem(payload)
      console.log("✅ Saved:", res.data)
      alert("Media item added successfully!")
      e.target.reset() // clear form
      setStatus("0")   // reset status
    } catch (err) {
      console.error("❌ Error saving:", err)
      alert("Failed to save media item. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-2xl font-semibold">Add Media Item</h2>

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

      <Button
        type="submit"
        className="bg-blue-600 text-white"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}
