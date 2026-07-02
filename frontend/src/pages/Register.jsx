import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import API from "../services/api";

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

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700 text-white p-16">
          <FaRobot size={70} />

          <h1 className="text-5xl font-bold mt-8">ResumeIQ AI</h1>

          <p className="mt-6 text-lg">
            Create your free account and improve your resume with AI.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-12">
          <h2 className="text-4xl font-bold">Create Account</h2>

          <p className="text-gray-500 mt-3">
            Join ResumeIQ AI and start analyzing your resume with AI.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Name */}
            <div>
              <label className="font-semibold">Name</label>

              <div className="flex items-center border rounded-xl px-4 mt-2">
                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold">Email</label>

              <div className="flex items-center border rounded-xl px-4 mt-2">
                <MdEmail className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold">Password</label>

              <div className="flex items-center border rounded-xl px-4 mt-2">
                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center">
            Already have an account?
            <Link to="/" className="ml-2 text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
