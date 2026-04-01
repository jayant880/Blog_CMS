import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export const Layout = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

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
          <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-sm">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </form>
          <div className="flex items-center gap-4">
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
                  to="/auth/login"
                  className="font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
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
