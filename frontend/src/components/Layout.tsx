import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export const Layout = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <nav className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto p-4 container">
          <Link to="/" className="font-sans font-bold text-blue-600 text-xl">
            My CMS Blog
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-post"
                  className="font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-medium text-gray-600 hover:text-blue-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto px-4 py-8 container grow">
        <Outlet />
      </main>
      <footer className="bg-white mt-auto border-gray-200 border-t">
        <div className="mx-auto px-4 py-6 text-gray-500 text-center container">
          &copy; {new Date().getFullYear()} My CMS Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
