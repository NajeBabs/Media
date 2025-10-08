import { BrowserRouter, Routes, Route } from "react-router-dom"
import ListPage from "./pages/ListPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import { ToastContainer } from "react-toastify"
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"
import TopNav from "./components/TopNav.jsx"   // import TopNav

export default function App() {
  return (
    <BrowserRouter>
      <TopNav /> 
      <div className="min-h-screen bg-gradient-to-br from-[#f7cac9] to-[#92a8d1]">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/media" element={<ListPage />} /> 
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
