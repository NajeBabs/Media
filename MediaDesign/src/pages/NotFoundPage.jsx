export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-lg mb-4">Oops! Page not found.</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
        Go back home
      </a>
    </div>
  )
}
