import { useState } from "react"
import { Edit, Trash2, Save, X, Star } from "lucide-react"
import EditableCell from "./EditableCell.jsx"
import LoadingRow from "../LoadingRow.jsx"
import { cleanGenres, validateMedia } from "../utils/mediaValidation.jsx"

export default function MediaTable({ items, loading, onDelete, onUpdate }) {
  const [editRowId, setEditRowId] = useState(null)
  const [rowData, setRowData] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  // Sort items
  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig.key) return 0
    let aVal = a[sortConfig.key]
    let bVal = b[sortConfig.key]

    if (typeof aVal === "string") aVal = aVal.toLowerCase()
    if (typeof bVal === "string") bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  // Handlers
  function handleSort(key) {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  function handleEdit(item) {
    setEditRowId(item.id)
    setRowData({ ...item })
  }

  function handleCancel() {
    setEditRowId(null)
    setRowData({})
  }

  function handleChange(e) {
    setRowData({ ...rowData, [e.target.name]: e.target.value })
  }

  // Labels
  const statusLabels = {
    0: "Planned",
    1: "Watching",
    2: "Watched",
    3: "Dropped",
  }

  const mediaTypeLabels = {
    0: "Movie",
    1: "TV Series",
    2: "Anime",
  }

  // Counts for cards
  const counts = {
    plan: items.filter((i) => i.status === 0).length,
    watching: items.filter((i) => i.status === 1).length,
    watched: items.filter((i) => i.status === 2).length,
    dropped: items.filter((i) => i.status === 3).length,
    total: items.length,
  }

  return (
    <div className="overflow-x-auto">
      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-2xl">{counts.total}</p>
        </div>
        <div className="bg-gray-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Plan To Watch</h3>
          <p className="text-2xl">{counts.plan}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Watching</h3>
          <p className="text-2xl">{counts.watching}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Watched</h3>
          <p className="text-2xl">{counts.watched}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Dropped</h3>
          <p className="text-2xl">{counts.dropped}</p>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-[700px] w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-pink-300">
            <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("title")}>
              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th className="px-4 py-2 text-center cursor-pointer" onClick={() => handleSort("yearReleased")}>
              Year {sortConfig.key === "yearReleased" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th className="px-4 py-2 text-left">Genres</th>
            <th className="px-4 py-2 text-center">Media Type</th>
            <th className="px-4 py-2 text-center">Rating</th>
            <th className="px-4 py-2 text-center cursor-pointer" onClick={() => handleSort("status")}>
              Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading && sortedItems.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No media yet. <span className="text-blue-600 cursor-pointer underline">Click Add Media</span> to get started.
              </td>
            </tr>
          )}
          {loading ? (
            <LoadingRow type="skeleton" />
          ) : (
            sortedItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-pink-100 transition">
                {/* Title */}
                <EditableCell
                  editing={editRowId === item.id}
                  value={editRowId === item.id ? rowData.title : item.title}
                  name="title"
                  onChange={handleChange}
                  align="left"
                />

                {/* Year */}
                <EditableCell
                  editing={editRowId === item.id}
                  value={editRowId === item.id ? rowData.yearReleased : item.yearReleased}
                  name="yearReleased"
                  onChange={handleChange}
                  align="center"
                />

                {/* Genres */}
                <td className="px-4 py-2 align-middle text-left">
                  {editRowId === item.id ? (
                    <input
                      type="text"
                      name="genres"
                      value={rowData.genres}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {item.genres.split(/[, ]+/).map((g, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                          {g.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </td>

                {/* Media Type */}
                <td className="px-4 py-2 align-middle text-center">
                  {editRowId === item.id ? (
                    <select
                      name="mediaType"
                      value={rowData.mediaType}
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    >
                      <option value="0">Movie</option>
                      <option value="1">TV Series</option>
                      <option value="2">Anime</option>
                    </select>
                  ) : (
                    mediaTypeLabels[item.mediaType] || "Unknown"
                  )}
                </td>

                {/* Rating */}
                <td className="px-4 py-2 align-middle text-center">
                  {editRowId === item.id ? (
                    <input
                      type="number"
                      name="rating"
                      value={rowData.rating ?? ""}
                      onChange={handleChange}
                      className="w-20 border rounded px-2 py-1 text-center"
                      min="1"
                      max="10"
                    />
                  ) : item.rating ? (
                    <div className="flex justify-center items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = (i + 1) * 2
                        if (item.rating >= starValue) {
                          return <Star key={i} size={18} className="fill-rose-400 text-rose-400" />
                        } else if (item.rating === starValue - 1) {
                          return <Star key={i} size={18} className="fill-rose-400 text-rose-400 opacity-50" />
                        } else {
                          return <Star key={i} size={18} className="text-gray-300" />
                        }
                      })}
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>

                {/* Status */}
                {/* <EditableCell
                  editing={editRowId === item.id}
                  value={editRowId === item.id ? rowData.status : statusLabels[item.status] || "Unknown"}
                  name="status"
                  onChange={handleChange}
                  align="center"
                /> */}
                <td className="px-4 py-2 align-middle text-center">
                  {editRowId === item.id ? (
                    <select
                      name="status"
                      value={rowData.status}
                      onChange={handleChange}
                      align="center"
                      className="border rounded px-2 py-1"
                    >
                      <option value="0">Planned</option>
                      <option value="1">Watching</option>
                      <option value="2">Watched</option>
                      <option value="3">Dropped</option>
                    </select>
                  ) : (
                    statusLabels[item.status] || "Unknown"
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 align-middle text-center">
                  {editRowId === item.id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                          const cleanedRow = { ...rowData, genres: cleanGenres(rowData.genres) }
                          const errors = validateMedia(cleanedRow)
                          if (Object.keys(errors).length > 0) {
                            alert("❌ Validation failed:\n" + Object.values(errors).join("\n"))
                            return
                          }
                          onUpdate(item.id, cleanedRow)
                          handleCancel()
                        }}
                      >
                        <Save size={16} />
                      </button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(item)}>
                        <Edit size={16} />
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
