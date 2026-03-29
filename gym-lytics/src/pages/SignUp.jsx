import React, { useState } from "react";
import { signup } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle signup
  const handleSignup = async () => {
    try {
      // basic validation
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        return alert("All fields are required");
      }

      if (form.password !== form.confirmPassword) {
        return alert("Passwords do not match");
      }

      const res = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/"); // redirect to login
    } catch (err) {
      console.error(err.response?.data?.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-700 shadow-xl">

        <h2 className="text-white text-2xl font-semibold mb-6">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full py-2 rounded-lg bg-orange-600 hover:bg-orange-700 transition text-white font-medium"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-orange-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}