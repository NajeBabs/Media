import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ListPage from "./pages/ListPage.jsx"
import AddPage from "./pages/AddPage.jsx"
import EditPage from "./pages/EditPage.jsx"
import DetailsPage from "./pages/DetailsPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function TopNav() {
  return (
    <nav className="flex gap-4 p-4 border-b bg-white">
      <Link to="/" className="font-bold text-xl text-blue-600">Media Collection</Link>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <div className="min-h-screen bg-gradient-to-br from-[#f7cac9] to-[#92a8d1]">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </BrowserRouter>
  )
}
