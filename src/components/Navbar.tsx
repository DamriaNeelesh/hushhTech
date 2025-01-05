import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import services from "../services/services";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false); // Close the drawer if clicked outside
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoggedIn) {
        services.authentication.isLoggedIn(setIsLoggedIn);
      }
    }, 10);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isLoggedIn]);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false); // Close the drawer after clicking a link
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Hushh Technologies LLC
          </Link>

          {/* Hamburger Button for Mobile */}
          <button
            onClick={toggleDrawer}
            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <FiMenu size={24} />
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/about/leadership" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              About Us
            </Link>
            <Link to="/career" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              Careers
            </Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/Login")}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => services.authentication.signOut()}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 lg:hidden">
          <div
            ref={drawerRef}
            className="fixed top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg p-6"
          >
            {/* Close Button */}
            <button
              onClick={toggleDrawer}
              className="mb-6 text-gray-700 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>

            {/* Mobile Menu Items */}
            <div className="space-y-6">
              <Link
                to="/"
                onClick={() => handleLinkClick("/")}
                className="block text-lg font-semibold text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/about/leadership"
                onClick={() => handleLinkClick("/about/leadership")}
                className="block text-lg font-semibold text-gray-700"
              >
                About Us
              </Link>
              <Link
                to="/career"
                onClick={() => handleLinkClick("/career")}
                className="block text-lg font-semibold text-gray-700"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                onClick={() => handleLinkClick("/contact")}
                className="block text-lg font-semibold text-gray-700"
              >
                Contact
              </Link>
              <Link
                to="/Faq"
                onClick={() => handleLinkClick("/Faq")}
                className="block text-lg font-semibold text-gray-700"
              >
                FAQ
              </Link>
              <button
                onClick={() => {
                  handleLinkClick("/Login");
                }}
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
