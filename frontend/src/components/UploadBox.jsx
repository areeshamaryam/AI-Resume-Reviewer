import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

function UploadBox({ onUploadSuccess }) {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing Resume...");
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 6;
        });
      }, 350);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisComplete(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast("Please upload a resume first.", {
        icon: "⚠️",
      });
      return;
    }

    try {
      setLoading(true);
      setProgress(5);
      setLoadingText("Analyzing Resume...");

      const formData = new FormData();

      formData.append("resume", selectedFile);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);

      await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProgress(100);
      setLoadingText("Analysis Complete!");
      setAnalysisComplete(true);

      toast.success("Resume analyzed successfully!");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onUploadSuccess) {
        await onUploadSuccess();
      }

      setSelectedFile(null);
      inputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
      setProgress(0);
      setLoadingText("Analyzing Resume...");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-sm p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">Upload Resume</h2>

      <p className="text-slate-500 mb-8">
        Upload your resume in PDF format and receive an AI-powered ATS report.
      </p>

      <div
        onClick={() => !loading && inputRef.current.click()}
        className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all duration-300 cursor-pointer rounded-2xl p-12 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-50 hover:shadow-md"
      >
        <FaCloudUploadAlt className="text-indigo-600 mb-5" size={68} />

        <h3 className="text-2xl font-semibold text-slate-900">
          Upload Your Resume
        </h3>

        <p className="text-slate-500 mt-2">Supports PDF • Maximum 5 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFile}
          disabled={loading}
        />
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Target Job Title
          </label>

          <input
            type="text"
            placeholder="e.g. React Developer, AI Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Job Description
          </label>

          <textarea
            rows="5"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
          />
        </div>
      </div>
      {selectedFile && !analysisComplete && !loading && (
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="font-semibold text-slate-800">📄 Selected File</h3>

          <p className="mt-2 font-medium text-slate-900">{selectedFile.name}</p>

          <p className="text-sm text-slate-500 mt-1">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {loading && (
        <div className="mt-8">
          <div className="flex justify-between text-sm font-semibold text-indigo-700 mb-3">
            <span>{loadingText}</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {analysisComplete && !loading && (
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <h3 className="font-semibold text-emerald-700">
            ✅ Analysis Complete
          </h3>

          <p className="mt-2 font-medium text-slate-800">
            Your resume has been analyzed successfully.
          </p>

          <div className="mt-4 text-sm text-slate-700 space-y-1">
            <p>✔ ATS Score Generated</p>
            <p>✔ Skills Identified</p>
            <p>✔ Missing Keywords Found</p>
            <p>✔ AI Suggestions Ready</p>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
          loading
            ? "bg-slate-300 cursor-not-allowed text-slate-500"
            : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <FaSpinner className="animate-spin" />
            {loadingText}
          </div>
        ) : (
          "Analyze Resume"
        )}
      </button>
    </div>
  );
}

export default UploadBox;
