import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import services from "../services/services";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const drawerRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoggedIn) {
        services.authentication.isLoggedIn(setIsLoggedIn);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Hushh Technologies LLC
          </Link>

          <button onClick={toggleDrawer} className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none">
            <FiMenu size={24} />
          </button>

          <div className="hidden lg:flex items-center space-x-6">
            {[
              { path: "/about/leadership", label: "About Us" },
              { path: "/community", label: "Community" },
              { path: "/career", label: "Careers" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded ${
                  isActive(path) ? "hushh-gradient font-[700] text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <button onClick={() => navigate("/Login")} className="bg-black text-white px-4 py-2 rounded">
                Log In
              </button>
            ) : (
              <button onClick={() => services.authentication.signOut()} className="bg-black text-white px-4 py-2 rounded">
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 lg:hidden">
          <div ref={drawerRef} className="fixed top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg p-6">
            <button onClick={toggleDrawer} className="mb-6 text-gray-700 hover:text-gray-900">
              <FiX size={24} />
            </button>

            <div className="space-y-6">
              {[
                { path: "/", label: "Home" },
                { path: "/about/leadership", label: "About Us" },
                { path: "/community", label: "Community" },
                { path: "/career", label: "Careers" },
                { path: "/contact", label: "Contact" },
                { path: "/Faq", label: "FAQ" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => handleLinkClick(path)}
                  className={`block text-lg font-semibold ${
                    isActive(path) ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white px-3 py-2 rounded" : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <button
                onClick={() => handleLinkClick("/Login")}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
