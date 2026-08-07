import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration Failed");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

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
  showPassword ? "text-green-600" : "text-gray-500"
}`}
  >
    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
  </button>
</div>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;