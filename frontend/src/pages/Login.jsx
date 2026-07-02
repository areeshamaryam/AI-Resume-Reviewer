import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaLock } from "react-icons/fa";
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

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 text-white p-16">
          <FaRobot size={70} />

          <h1 className="text-5xl font-bold mt-8">ResumeIQ AI</h1>

          <p className="mt-6 text-lg leading-8 opacity-90">
            AI-Powered Resume Analysis
          </p>

          <p className="mt-8 text-lg">
            Upload your resume and instantly receive:
          </p>

          <ul className="mt-8 space-y-5 text-lg">
            <li>✔ ATS Score</li>
            <li>✔ Resume Summary</li>
            <li>✔ Strengths & Weaknesses</li>
            <li>✔ Missing Skills</li>
            <li>✔ AI Suggestions</li>
          </ul>
        </div>

        {/* Right */}

        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to ResumeIQ AI
          </h2>

          <p className="text-gray-500 mt-3">Login to continue</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="font-semibold">Email</label>

              <div className="mt-2 flex items-center border rounded-xl px-4">
                <MdEmail className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Password</label>

              <div className="mt-2 flex items-center border rounded-xl px-4">
                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center">
            Don't have an account?
            <Link to="/register" className="ml-2 text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
