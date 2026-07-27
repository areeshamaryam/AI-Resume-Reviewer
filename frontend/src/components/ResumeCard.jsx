import { Link } from "react-router-dom";
import { FaFilePdf, FaTrash, FaRegStar } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function ResumeCard({ resume, onDelete }) {
  const deleteResume = async () => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

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
      ? "bg-emerald-100 text-emerald-700"
      : score >= 60
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <div className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-sm">
          <FaFilePdf className="text-red-600 text-3xl" />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-lg text-slate-900 truncate"
            title={resume.originalName}
          >
            {resume.originalName || "Resume.pdf"}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ATS Score */}
      <div className="mt-7">
        <p className="text-sm font-medium text-slate-500 mb-3">ATS Score</p>

        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm ${scoreColor}`}
        >
          <FaRegStar />
          <span>{score}%</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <Link
          to={`/resume/${resume._id}`}
          className="flex-1 text-center rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          View Report
        </Link>

        <button
          onClick={deleteResume}
          className="px-5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;
