import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:4000/api/auth/signin", formData);

      // save token
      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to home
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d] px-6">
      
      <div className="bg-[#140020] p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login to Vidyavanni
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-md bg-[#220033] text-white border border-purple-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-md bg-[#220033] text-white border border-purple-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Signup here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;