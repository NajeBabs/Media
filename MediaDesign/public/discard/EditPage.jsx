import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMediaItemById, updateMediaItem } from "../../src/api/mediaApi.js"
import Input from "../../src/components/Input.jsx"
import Select from "../../src/components/Select.jsx"
import Button from "../../src/components/Button.jsx"

export default function EditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    yearReleased: "",
    genres: "",
    mediaType: 0,
    status: 0,
    rating: ""
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await getMediaItemById(id)
        const m = res.data
        setForm({
          title: m.title,
          yearReleased: m.yearReleased,
          genres: m.genres,
          mediaType: m.mediaType,
          status: m.status,
          rating: m.rating ?? ""
        })
      } catch (err) {
        console.error("❌ Failed to fetch:", err)
        setError("Failed to load media item")
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = {
        ...form,
        yearReleased: Number(form.yearReleased),   // 🔧 ensure int
        mediaType: Number(form.mediaType),         // 🔧 ensure int/enum
        status: Number(form.status),               // 🔧 ensure int/enum
        rating: form.rating === "" ? null : Number(form.rating) // 🔧 nullable int
      }
      await updateMediaItem(id, payload)
      alert("✅ Updated successfully")
      navigate("/") // go back to list
    } catch (err) {
      console.error("❌ Failed to update:", err.response?.data || err.message)
      alert("Update failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h2 className="text-2xl mb-4">Edit Media Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <Input name="yearReleased" type="number" value={form.yearReleased} onChange={handleChange} placeholder="Year Released" />
        <Input name="genres" value={form.genres} onChange={handleChange} placeholder="Genres (comma separated)" />

        <Select name="mediaType" value={form.mediaType} onChange={handleChange}>
          <option value={0}>Movie</option>
          <option value={1}>TV Series</option>
          <option value={2}>Anime</option>
        </Select>

        <Select name="status" value={form.status} onChange={handleChange}>
          <option value={0}>Plan To Watch</option>
          <option value={1}>Watching</option>
          <option value={2}>Watched</option>
          <option value={3}>Dropped</option>
        </Select>

        {/* Show rating only if Watching, Watched, Dropped */}
        {form.status !== 0 && (
          <Input
            name="rating"
            type="number"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (1–10)"
          />
        )}

        <Button type="submit" className="bg-blue-600 text-white" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
