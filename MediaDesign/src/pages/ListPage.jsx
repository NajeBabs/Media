import { useEffect, useState } from "react"
import { getMediaItems, deleteMediaItem, updateMediaItem } from "../api/mediaApi.js"
import AddMediaModal from "../components/modals/AddMediaModal.jsx"
import MediaTable from "../components/table/MediaTable.jsx"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      const start = Date.now()

      const res = await getMediaItems()

      const elapsed = Date.now() - start
      const remaining = 1000 - elapsed

      setTimeout(() => {
        setItems(res.data)
        setLoading(false)
      }, remaining > 0 ? remaining : 0)
    }

    fetchItems()
  }, [])

  async function loadItems() {
    setLoading(true)
    try {
      const res = await getMediaItems()
      setItems(res.data)
    } catch (err) {
      toast.error("Failed to load items")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    })

    if (result.isConfirmed) {
      await deleteMediaItem(id)
      toast.success("Deleted successfully")
      loadItems()
    }
  }

  async function handleUpdate(id, data) {
    try {
      const payload = {
        title: data.title,
        yearReleased: parseInt(data.yearReleased),
        genres: data.genres,
        mediaType: parseInt(data.mediaType),
        status: parseInt(data.status),
        rating: data.rating ? parseInt(data.rating) : null
      };

      const res = await updateMediaItem(id, payload);

      // Update state without full reload
      setItems(prev =>
        prev.map(item => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/3 bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Media List</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Media
          </button>
        </div>

        <MediaTable
          items={items}
          loading={loading}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {showModal && (
          <AddMediaModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false)
              loadItems()
              // toast.success("Media added successfully")
            }}
          />
        )}
      </div>
    </div>
  )
}
