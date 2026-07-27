import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", formData);

      sessionStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        {/* Logo */}

        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl flex items-center justify-center">
            <FaRobot className="text-white text-4xl" />
          </div>

          <h1 className="mt-5 text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ResumeIQ
          </h1>

          <p className="mt-3 text-slate-500 text-center">
            AI-powered Resume Analysis Platform
          </p>
        </div>

        {/* Card */}

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

          <p className="text-slate-500 mt-2">Sign in to continue.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
                <MdEmail className="ml-4 text-slate-400 text-xl" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent p-4 outline-none text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
                <FaLock className="ml-4 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-4 pl-4 pr-12 outline-none text-slate-700 placeholder:text-slate-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-slate-600">
              Don't have an account?
              <Link
                to="/register"
                className="ml-2 font-semibold text-indigo-600 hover:text-violet-600 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Smart ATS Scoring • AI Feedback • Resume Optimisation
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
