import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://shopsphere-l2ul.onrender.com/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("isAdmin", "true");

      alert("Admin Login Successful");

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 w-full text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;