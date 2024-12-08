import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import services from "../services/services";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setInterval(() => {
      !isLoggedIn ? services.authentication.isLoggedIn(setIsLoggedIn) : "";
    }, 10);
  }, []);
  // Function to open the careers page in a new tab
  const openInNewTab = () => {
    window.open("https://www.linkedin.com/in/manishsainani/", "_blank");
  };

  // Toggle the drawer
  const toggleDrawer = () => setIsOpen(!isOpen);

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
            {/* About Link */}
            <Link
              to="/about/leadership"
              className="px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              About Us
            </Link>
            {/* Solution Dropdown */}
            {/* <Menu as="div" className="relative">
              <Menu.Button className="px-3 py-2 text-gray-700 hover:text-gray-900">
                Solution
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/services/consumers"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      For Consumers
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/services/business"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      For Businesses
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu> */}

            {/* Careers Link */}
            <Link
              to="/career"
              className="px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              Careers
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className="px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>

            {/* Login Button */}
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
          <div className="fixed top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg p-6">
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
                onClick={toggleDrawer}
                className="block text-lg font-semibold text-gray-700"
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                to="/about/leadership"
                onClick={toggleDrawer}
                className="block text-lg font-semibold text-gray-700"
              >
                About Us
              </Link>

              {/* Solution Dropdown */}
              {/* <Menu as="div">
                <Menu.Button className="block text-lg font-semibold text-gray-700">
                  Solution
                </Menu.Button>
                <Menu.Items className="bg-gray-100 mt-2 rounded-md shadow-lg">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/services/consumers"
                        onClick={toggleDrawer}
                        className={`${
                          active ? 'bg-gray-200' : ''
                        } block px-4 py-2`}
                      >
                        For Consumers
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/services/business"
                        onClick={toggleDrawer}
                        className={`${
                          active ? 'bg-gray-200' : ''
                        } block px-4 py-2`}
                      >
                        For Businesses
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu> */}

              {/* Careers & Contact */}
              <Link
                to="/career"
                className="block text-lg font-semibold text-gray-700"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                onClick={toggleDrawer}
                className="block text-lg font-semibold text-gray-700"
              >
                Contact
              </Link>
              <Link
                to="/Faq"
                onClick={toggleDrawer}
                className="block text-lg font-semibold text-gray-700"
              >
                FAQ
              </Link>
              <button
                onClick={() => {
                  navigate('/Login');
                  toggleDrawer();
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
