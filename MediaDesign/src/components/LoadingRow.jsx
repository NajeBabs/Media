// src/components/LoadingRow.jsx
export default function LoadingRow({ type = "spinner", columns = 6, rows = 5 }) {
  if (type === "spinner") {
    return (
      <tr>
        <td colSpan={columns} className="text-center py-6">
          <div className="flex justify-center items-center gap-2">
            <svg
              className="animate-spin h-6 w-6 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-pink-600 font-medium">Loading...</span>
          </div>
        </td>
      </tr>
    )
  }

  // Skeleton rows
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
