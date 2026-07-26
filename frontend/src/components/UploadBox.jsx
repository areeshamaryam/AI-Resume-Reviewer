import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

function UploadBox({ onUploadSuccess }) {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing Resume...");
  const [progress, setProgress] = useState(0);

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
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setProgress(5);
      setLoadingText("Analyzing Resume...");

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const res = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProgress(100);
      setLoadingText("Analysis Complete!");

      toast.success("Resume analyzed successfully!");

      await new Promise((resolve) => setTimeout(resolve, 900));

      setSelectedFile(null);

      inputRef.current.value = "";

      if (onUploadSuccess) {
        await onUploadSuccess();
      }
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
    <div className="bg-white rounded-3xl shadow-xl p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Upload Resume</h2>

      <p className="text-gray-500 mb-8">
        Upload your resume in PDF format and receive an AI-powered ATS report.
      </p>

      <div
        onClick={() => !loading && inputRef.current.click()}
        className="border-2 border-dashed border-blue-300 hover:border-blue-600 transition-all duration-300 cursor-pointer rounded-2xl p-12 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100"
      >
        <FaCloudUploadAlt className="text-blue-600 mb-5" size={70} />

        <h3 className="text-2xl font-semibold text-gray-800">
          Upload Your Resume
        </h3>

        <p className="text-gray-500 mt-2">Supports PDF • Maximum 5 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFile}
          disabled={loading}
        />
      </div>

      {selectedFile && (
        <div className="mt-8 bg-green-50 border border-green-300 rounded-xl p-5">
          <p className="font-semibold text-green-700">✅ Ready for Analysis</p>

          <p className="mt-2 font-medium text-gray-800">{selectedFile.name}</p>

          <p className="text-sm text-gray-500 mt-1">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>✔ ATS Score</p>
            <p>✔ Skills Detection</p>
            <p>✔ Missing Keywords</p>
            <p>✔ AI Suggestions</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6">
          <div className="flex justify-between text-sm font-semibold text-blue-700 mb-2">
            <span>{loadingText}</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
          !selectedFile || loading
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
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
