import { useState } from "react"
import { Edit, Trash2, Save, X } from "lucide-react"
import EditableCell from "./EditableCell.jsx"

export default function MediaTable({ items, loading, onDelete, onUpdate }) {
  const [editRowId, setEditRowId] = useState(null)
  const [rowData, setRowData] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

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

  function handleSort(key) {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  function handleEdit(item) {
    setEditRowId(item.id)
    setRowData(item)
  }

  function handleCancel() {
    setEditRowId(null)
    setRowData({})
  }

  function handleChange(e) {
    setRowData({ ...rowData, [e.target.name]: e.target.value })
  }

  const statusLabels = {
    0: "Plan To Watch",
    1: "Watching",
    2: "Watched",
    3: "Dropped",
    }

    const counts = {
        plan: items.filter(i => i.status === 0).length,
        watching: items.filter(i => i.status === 1).length,
        watched: items.filter(i => i.status === 2).length,
        dropped: items.filter(i => i.status === 3).length,
        total: items.length,
    }

  return (
    <>
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

        <table className="w-full border-collapse table-fixed">
        <thead>
            <tr className="bg-pink-300">
                <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("title")}
                >
                    Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                    className="px-4 py-2 text-center cursor-pointer"
                    onClick={() => handleSort("yearReleased")}
                >
                    Year {sortConfig.key === "yearReleased" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-4 py-2 text-left">Genres</th>
                <th className="px-4 py-2 text-center">Rating</th>
                <th
                    className="px-4 py-2 text-center cursor-pointer"
                    onClick={() => handleSort("status")}
                >
                    Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-4 py-2 text-center">Actions</th>
            </tr>
        </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="4" className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : (
          sortedItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-pink-100 transition">
            <EditableCell
                editing={editRowId === item.id}
                value={editRowId === item.id ? rowData.title : item.title}
                name="title"
                onChange={handleChange}
                align="left"
            />
            <EditableCell
                editing={editRowId === item.id}
                value={editRowId === item.id ? rowData.yearReleased : item.yearReleased}
                name="yearReleased"
                onChange={handleChange}
                align="center"
            />
            <EditableCell
                editing={editRowId === item.id}
                value={editRowId === item.id ? rowData.genres : item.genres}
                name="genres"
                onChange={handleChange}
                align="left"
            />

            {/* Rating */}
            <EditableCell
                editing={editRowId === item.id}
                value={
                editRowId === item.id
                    ? rowData.rating ?? ""
                    : item.rating ?? "N/A"
                }
                name="rating"
                onChange={handleChange}
                align="center"
            />

            {/* Status */}
            <EditableCell
                editing={editRowId === item.id}
                value={
                editRowId === item.id
                    ? rowData.status
                    : statusLabels[item.status] || "Unknown"
                }
                name="status"
                onChange={handleChange}
                align="center"
            />

            {/* Actions */}
            <td className="px-4 py-2 align-middle text-center">
                {editRowId === item.id ? (
                <>
                    <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => {
                        onUpdate(item.id, rowData)
                        handleCancel()
                    }}
                    >
                    <Save size={16} />
                    </button>
                    <button
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                    onClick={handleCancel}
                    >
                    <X size={16} />
                    </button>
                </>
                ) : (
                <>
                    <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(item)}
                    >
                    <Edit size={16} />
                    </button>
                    <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onDelete(item.id)}
                    >
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
    </>
  )
}
