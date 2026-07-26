import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import ResumeCard from "../components/ResumeCard";
import API from "../services/api";
import { FaFileAlt, FaStar, FaRobot, FaCalendarAlt } from "react-icons/fa";

function Dashboard() {
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
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-gray-800">
          AI Resume Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Analyze, track, and improve your resumes with AI-powered insights.
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaFileAlt className="text-blue-600 text-3xl mb-4" />
            <p className="text-gray-500">Total Resumes</p>
            <h2 className="text-3xl font-bold">{resumes.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaStar className="text-yellow-500 text-3xl mb-4" />
            <p className="text-gray-500">Average ATS Score</p>
            <h2 className="text-3xl font-bold">{averageATS}%</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaRobot className="text-purple-600 text-3xl mb-4" />
            <p className="text-gray-500">AI Reviews</p>
            <h2 className="text-3xl font-bold">{resumes.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaCalendarAlt className="text-green-600 text-3xl mb-4" />
            <p className="text-gray-500">Latest Upload</p>
            <h2 className="text-xl font-bold">{latestResume}</h2>
          </div>
        </div>

        {/* Upload */}

        <div className="mt-10">
          <UploadBox onUploadSuccess={fetchResumes} />
        </div>

        {/* Search + Sort */}

        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold">Recent Resume Reviews</h2>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search Resume..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest ATS</option>
                <option value="lowest">Lowest ATS</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : filteredResumes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <p className="text-gray-500">No matching resumes found.</p>
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
