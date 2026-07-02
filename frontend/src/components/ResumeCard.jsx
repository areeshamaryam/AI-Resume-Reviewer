import { Link } from "react-router-dom";

function ResumeCard({ resume }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="font-bold text-xl text-gray-800 truncate">
        {resume.fileName}
      </h3>

      <p className="mt-4 text-lg">
        ⭐ ATS Score:
        <span className="font-bold text-blue-600 ml-2">{resume.atsScore}</span>
      </p>

      <p className="text-gray-500 mt-3">
        {new Date(resume.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 flex justify-between">
        <Link
          to={`/resume/${resume._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          View Report
        </Link>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;
