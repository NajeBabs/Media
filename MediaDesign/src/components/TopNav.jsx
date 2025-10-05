import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function TopNav() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center gap-4 p-4 border-b bg-white">
      <Link to="/" className="font-bold text-xl text-blue-600">
        Media Collection
      </Link>

      <div className="flex gap-4">
        {!token ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
