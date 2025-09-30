export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={[
        "px-4 py-2 rounded-xl border shadow-sm transition",
        "hover:shadow-md hover:-translate-y-0.5", // subtle hover lift
        className
      ].join(" ")}
    >
      {children}
    </button>
  )
}
