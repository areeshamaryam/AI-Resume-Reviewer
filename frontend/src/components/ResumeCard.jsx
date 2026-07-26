import { Link } from "react-router-dom";
import { FaFilePdf, FaTrash, FaRegStar } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function ResumeCard({ resume, onDelete }) {
  const deleteResume = async () => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await API.delete(`/resume/${resume._id}`);

      toast.success("Resume deleted");

      onDelete(resume._id);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const score = resume.atsScore || 0;

  const scoreColor =
    score >= 80
      ? "text-green-700 bg-green-100"
      : score >= 60
        ? "text-yellow-700 bg-yellow-100"
        : "text-red-700 bg-red-100";

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border">
      {/* Top */}

      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-4 rounded-2xl">
          <FaFilePdf className="text-red-600 text-3xl" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800 truncate">
            {resume.originalName || "Resume.pdf"}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ATS */}

      <div className="mt-8">
        <p className="text-gray-500 mb-3">ATS Score</p>

        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-lg ${scoreColor}`}
        >
          <FaRegStar />
          {score}%
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-3">
        <Link
          to={`/resume/${resume._id}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
        >
          View Report
        </Link>

        <button
          onClick={deleteResume}
          className="bg-red-500 hover:bg-red-600 px-5 rounded-xl text-white transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;
