export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full px-3 py-2 rounded-xl border outline-none",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "transition",
        className
      ].join(" ")}
    />
  )
}
