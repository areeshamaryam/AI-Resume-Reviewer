import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import API from "../services/api";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      await API.post("/auth/register", formData);
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Account created successfully!",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });

      navigate("/");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
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
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>

          <p className="text-slate-500 mt-2">
            Join ResumeIQ and start analyzing your resume with AI.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Name */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
                <FaUser className="ml-4 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-transparent p-4 outline-none text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
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

              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
                <FaLock className="ml-4 text-slate-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full bg-transparent p-4 outline-none text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-slate-600">
              Already have an account?
              <Link
                to="/"
                className="ml-2 font-semibold text-indigo-600 hover:text-violet-600 transition"
              >
                Login
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

export default Register;
