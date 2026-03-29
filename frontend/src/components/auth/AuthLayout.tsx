import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl px-8 py-10 rounded-2xl">
          <nav className="flex justify-center gap-6 mb-8 text-sm">
            <Link 
              to="/auth/login" 
              className="font-medium text-gray-500 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link 
              to="/auth/register" 
              className="font-medium text-gray-500 hover:text-blue-600 transition"
            >
              Register
            </Link>
          </nav>
          
          <Outlet />
          
        </div>
        <footer className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            <Link to="/" className="hover:text-gray-600 transition">&larr; Back to Home</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
