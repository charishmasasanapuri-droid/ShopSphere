import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://shopsphere-l2ul.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

// Save the JWT token
localStorage.setItem("token", response.data.token);

// Save the logged-in user
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

// Go to Home page
navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <div className="relative mb-4">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border p-3 rounded pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
      showPassword ? "text-blue-600" : "text-gray-500"
    }`}
  >
    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
  </button>
</div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;