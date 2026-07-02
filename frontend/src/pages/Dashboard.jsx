import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import ResumeCard from "../components/ResumeCard";
import API from "../services/api";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Upload your resume and receive an AI-powered ATS report.
        </p>

        <div className="mt-10">
          <UploadBox />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Resume Reviews</h2>

          {loading ? (
            <p>Loading...</p>
          ) : resumes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <p className="text-gray-500">No resume reviews yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onDelete={(id) => {
                    setResumes((prev) =>
                      prev.filter((item) => item._id !== id),
                    );
                  }}
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
