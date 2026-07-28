import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import ResumeCard from "../components/ResumeCard";
import API from "../services/api";
import { FaFileAlt, FaStar, FaRobot, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/resume/my-resumes");
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const averageATS =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((sum, item) => sum + item.atsScore, 0) /
            resumes.length,
        )
      : 0;

  const latestResume =
    resumes.length > 0
      ? new Date(resumes[0].createdAt).toLocaleDateString()
      : "--";

  const filteredResumes = [...resumes]
    .filter((resume) =>
      resume.originalName?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "highest":
          return b.atsScore - a.atsScore;

        case "lowest":
          return a.atsScore - b.atsScore;

        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F1F5F9]">
      {" "}
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white border border-slate-200 shadow-sm text-indigo-600 font-semibold hover:bg-indigo-50 hover:shadow-md transition-all duration-300 mb-8"
        >
          <FaArrowLeft className="text-sm" />
          Back to Login
        </Link>
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          👋 Welcome back, {user?.name || "User"}!
        </h1>

        <p className="text-lg text-slate-600 mt-3 max-w-2xl leading-8">
          Build stronger resumes with intelligent AI analysis.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Total Resumes */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            {" "}
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <FaFileAlt className="text-blue-600 text-xl" />
            </div>
            <p className="text-slate-500 text-sm">Total Resumes</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {resumes.length}
            </h2>
          </div>

          {/* ATS Score */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            {" "}
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-5">
              <FaStar className="text-yellow-500 text-xl" />
            </div>
            <p className="text-slate-500 text-sm">Average ATS Score</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {averageATS}%
            </h2>
          </div>

          {/* AI Reviews */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            {" "}
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
              <FaRobot className="text-purple-600 text-xl" />
            </div>
            <p className="text-slate-500 text-sm">AI Reviews</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {resumes.length}
            </h2>
          </div>

          {/* Latest Upload */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
            {" "}
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
              <FaCalendarAlt className="text-green-600 text-xl" />
            </div>
            <p className="text-slate-500 text-sm">Latest Upload</p>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {latestResume}
            </h2>
          </div>
        </div>

        {/* Upload */}
        <div className="mt-10">
          <UploadBox onUploadSuccess={fetchResumes} />
        </div>

        {/* Search + Sort */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Resume Reviews
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search Resume..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest ATS</option>
                <option value="lowest">Lowest ATS</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <p className="text-slate-500">Loading...</p>
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <p className="text-slate-500">No matching resumes found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onDelete={(id) =>
                    setResumes((prev) => prev.filter((item) => item._id !== id))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
