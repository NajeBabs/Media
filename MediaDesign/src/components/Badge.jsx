export default function Badge({ children, className = "" }) {
  return (
    <span
      className={[
        "inline-block px-2 py-0.5 text-sm rounded-xl border bg-gray-100",
        className
      ].join(" ")}
    >
      {children}
    </span>
  )
}
