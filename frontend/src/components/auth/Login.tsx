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
      // Store token
      if (res.data.token) {
        login(res.data.token);
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={disabled}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
