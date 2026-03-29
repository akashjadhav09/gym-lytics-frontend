import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/auth.api";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle signin
  const handleSignIn = async () => {
    try {
      if (!form.email || !form.password) {
        return alert("Email and password are required");
      }

      setLoading(true);

      const res = await signin(form);

      // save token
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-700 shadow-xl">

        <h2 className="text-white text-2xl font-semibold mb-6">
          Sign In
        </h2>

        <form
            onSubmit={(e) => {
                e.preventDefault(); // prevent page reload
                handleSignIn();
            }}
            >
            {/* Email */}
            <div className="mb-4">
                <label className="text-sm text-gray-400">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white"
                />
            </div>

            {/* Password */}
            <div className="mb-6">
                <label className="text-sm text-gray-400">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-gray-600 text-white"
                />
            </div>

            {/* Button */}
            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-orange-600 text-white"
            >
                Sign In
            </button>
            </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}