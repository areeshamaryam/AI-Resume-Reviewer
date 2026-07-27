import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-10 py-5">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          My Resumes
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
