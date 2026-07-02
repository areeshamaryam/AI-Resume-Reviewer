import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import API from "../services/api";

function UploadBox() {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // Make sure "resume" matches upload.single("resume") in your backend
      formData.append("resume", selectedFile);

      const res = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Resume uploaded successfully!");

      console.log(res.data);

      setSelectedFile(null);

      // Clear file input so the same PDF can be selected again
      inputRef.current.value = "";
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Upload Resume</h2>

      <p className="text-gray-500 mb-8">
        Upload your resume in PDF format and receive an AI-powered ATS report.
      </p>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition cursor-pointer rounded-2xl p-12 flex flex-col items-center justify-center bg-blue-50"
      >
        <FaCloudUploadAlt className="text-blue-600 mb-5" size={70} />

        <h3 className="text-2xl font-semibold text-gray-800">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 mt-2">or click to browse</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {selectedFile && (
        <div className="mt-8 bg-green-50 border border-green-300 rounded-xl p-5">
          <p className="font-semibold text-green-700">✅ Selected File</p>

          <p className="mt-2 text-gray-700">{selectedFile.name}</p>

          <p className="text-sm text-gray-500 mt-1">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold transition
        ${
          !selectedFile || loading
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}

export default UploadBox;
