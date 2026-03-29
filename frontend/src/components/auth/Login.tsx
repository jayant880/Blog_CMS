import axios from "../../utils/axios.js";
import { useState, type SyntheticEvent } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const disabled = isLoading || !username || !password;

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        alert("Please fill in all the fields");
        return;
      }
      setIsLoading(true);
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      if (res.data.token) {
        login(res.data.token, res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Error logging in");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 font-bold text-gray-800 text-2xl text-center">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="font-medium text-gray-700 text-sm">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium text-gray-700 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 mt-2 py-2 rounded-lg font-medium text-white transition cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
