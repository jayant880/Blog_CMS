import { Link, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <nav className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto p-4 container">
          <Link to="/" className="font-sans font-bold text-blue-600 text-xl">
            My CMS Blog
          </Link>
          <div className="flex gap-4">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/create-post"
              className="font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Create Post
            </Link>
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
