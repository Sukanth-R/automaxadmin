import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://translator-0dye.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      navigate(state?.from?.pathname || "/");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Welcome and Logo */}
      <div className="w-full md:w-3/5 bg-red-600 text-white p-12 flex flex-col justify-center items-center">
        <img
          src="https://adminastraautomax.in/images/AUTOMAX.png"
          alt="Automax"
          className="mb-6 h-16 w-auto"
        />
        <h1 className="text-4xl font-bold mb-4 tracking-widest text-center">Welcome Back Admin!</h1>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-2/5 bg-white p-10 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-widest text-center">Login</h2>
          <div>
            <label htmlFor="email" className="block tracking-widest text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block tracking-widest text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 font-medium"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}