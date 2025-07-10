import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-transparent opacity-50 animate-pulse" />
      
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-all duration-500 ease-in-out ${
          isLoading ? "backdrop-blur-md opacity-100" : "backdrop-blur-none opacity-0 pointer-events-none"
        } flex items-center justify-center z-50`}
      >
        {isLoading && (
          <svg
            className="animate-spin h-12 w-12 text-red-500"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-red-100/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <div className="text-center mb-10">
          <img
            src="https://astraautomax.in/images/logo1.png"
            alt="Automax"
            className="mx-auto mb-6 h-20 w-auto transition-transform duration-300 hover:scale-110"
          />
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h2>
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-red-200/50 rounded-xl text-gray-900 placeholder-transparent focus:ring-0 focus:border-red-500 transition-all duration-300 peer"
              placeholder="Email Address"
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-2.5 text-sm text-red-500 bg-white/95 px-2 rounded transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500 group-hover:text-red-600"
            >
              Email Address
            </label>
            <div className="absolute inset-0 rounded-xl bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>

          <div className="relative group">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-red-200/50 rounded-xl text-gray-900 placeholder-transparent focus:ring-0 focus:border-red-500 transition-all duration-300 peer"
              placeholder="Password"
              autoComplete="current-password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 -top-2.5 text-sm text-red-500 bg-white/95 px-2 rounded transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-red-500 group-hover:text-red-600"
            >
              Password
            </label>
            <div className="absolute inset-0 rounded-xl bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="relative w-full bg-red-500 text-white py-3 rounded-xl font-semibold overflow-hidden group transition-all duration-300 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-red-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100 origin-center rounded-full" />
            <span className="relative">{isLoading ? "Logging in..." : "Sign In"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}