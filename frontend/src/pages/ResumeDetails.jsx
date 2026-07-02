import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeDetails() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await API.get(`/resume/${id}`);
      setResume(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!resume)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Resume Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <Link to="/dashboard" className="text-blue-600 font-semibold">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-10 mt-6">
          <h1 className="text-4xl font-bold">Resume Analysis</h1>

          <div className="mt-8 bg-blue-50 rounded-2xl p-8">
            <p className="text-gray-500">ATS Score</p>

            <h2 className="text-6xl font-bold text-blue-600">
              {resume.atsScore}
            </h2>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold">Summary</h2>

            <p className="mt-4 text-gray-700 leading-8">{resume.summary}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-green-600">Strengths</h2>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              {resume.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-red-600">Weaknesses</h2>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              {resume.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-yellow-600">
              Missing Skills
            </h2>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              {resume.missingSkills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-600">
              AI Suggestions
            </h2>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              {resume.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;
