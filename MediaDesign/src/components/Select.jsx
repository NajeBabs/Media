export default function Select({ className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={[
        "w-full px-3 py-2 rounded-xl border outline-none transition",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className
      ].join(" ")}
    >
      {children}
    </select>
  )
}
