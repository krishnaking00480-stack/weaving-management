import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      if (res.data.success) {
        toast.success("Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to connect to server");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[420px]">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Weaving Management
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Production & Sales Management
        </p>

        <form onSubmit={handleLogin}>

          <label className="font-semibold">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter Username"
            className="w-full border rounded-lg p-3 mt-2 mb-5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border rounded-lg p-3 mt-2 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;