import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        alert("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid Username or Password");
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
          />

          <button
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