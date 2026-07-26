import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaFilePdf,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTools,
  FaLightbulb,
  FaCalendarAlt,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Resume Analysis...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Resume Not Found
      </div>
    );
  }

  const score = resume.atsScore || 0;

  const scoreColor =
    score >= 80 ? "#16a34a" : score >= 60 ? "#f59e0b" : "#ef4444";

  const scoreText =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement";

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}

            <div>
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-5 rounded-2xl">
                  <FaFilePdf className="text-red-600 text-4xl" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold">Resume Analysis</h1>

                  <p className="text-gray-500 mt-2">
                    {resume.originalName || "Resume.pdf"}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <FaCalendarAlt />

                    {new Date(resume.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="flex justify-center">
              <div className="w-56">
                <CircularProgressbar
                  value={score}
                  text={`${score}%`}
                  styles={buildStyles({
                    pathColor: scoreColor,
                    textColor: scoreColor,
                    trailColor: "#e5e7eb",
                    textSize: "18px",
                  })}
                />

                <p
                  className="text-center mt-5 text-2xl font-bold"
                  style={{ color: scoreColor }}
                >
                  {scoreText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold mb-5">Professional Summary</h2>

          <p className="text-gray-700 leading-8">{resume.summary}</p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Strengths */}

          <div className="bg-green-50 rounded-3xl p-8 shadow">
            <div className="flex items-center gap-3 mb-6">
              <FaCheckCircle className="text-green-600 text-3xl" />

              <h2 className="text-2xl font-bold text-green-700">Strengths</h2>
            </div>

            <ul className="space-y-3">
              {resume.strengths.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}

          <div className="bg-red-50 rounded-3xl p-8 shadow">
            <div className="flex items-center gap-3 mb-6">
              <FaExclamationTriangle className="text-red-600 text-3xl" />

              <h2 className="text-2xl font-bold text-red-700">Weaknesses</h2>
            </div>

            <ul className="space-y-3">
              {resume.weaknesses.map((item, index) => (
                <li key={index}>⚠ {item}</li>
              ))}
            </ul>
          </div>

          {/* Missing Skills */}

          <div className="bg-yellow-50 rounded-3xl p-8 shadow">
            <div className="flex items-center gap-3 mb-6">
              <FaTools className="text-yellow-600 text-3xl" />

              <h2 className="text-2xl font-bold text-yellow-700">
                Missing Skills
              </h2>
            </div>

            <ul className="space-y-3">
              {resume.missingSkills.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}

          <div className="bg-purple-50 rounded-3xl p-8 shadow">
            <div className="flex items-center gap-3 mb-6">
              <FaLightbulb className="text-purple-600 text-3xl" />

              <h2 className="text-2xl font-bold text-purple-700">
                AI Suggestions
              </h2>
            </div>

            <ul className="space-y-3">
              {resume.suggestions.map((item, index) => (
                <li key={index}>💡 {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;
