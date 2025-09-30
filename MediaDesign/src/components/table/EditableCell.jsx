export default function EditableCell({ editing, value, name, onChange, align = "left" }) {
  return (
    <td className={`px-4 py-2 align-middle text-${align}`}>
      {editing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm text-sm"
        />
      ) : (
        <span className="text-sm">{value}</span>
      )}
    </td>
  )
}
