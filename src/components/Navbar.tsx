import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import config from "../resources/config/config";
import { Image, useToast, Avatar, useBreakpointValue } from "@chakra-ui/react";
import hushhLogo from "../components/images/Hushhogo.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [toastShown, setToastShown] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const drawerRef = useRef(null);
  const careerDropdownRef = useRef(null);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    // Fetch the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    

    return () => subscription?.unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await config.supabaseClient.auth.signOut();
      setSession(null); // Ensure session is set to null after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // Show welcome toast when a user is signed in (only once)
  useEffect(() => {
    if (session && !toastShown) {
      toast({
        title: "Welcome to Hushh Technologies",
        description: "Thank you for signing in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setToastShown(true);
    }
  }, [session, toastShown, toast]);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full z-[999]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl flex flex-row items-center font-bold">
          <Image src={hushhLogo} alt="Hushh Logo" className="w-12 h-12" />
            Hushh Technologies LLC
          </Link>

          <button
            onClick={toggleDrawer}
            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
{/* For Desktop View */}
          <div className="hidden lg:flex items-center space-x-6">
            {[
              { path: "/about/leadership", label: "About Us" },
              { path: "/solutions", label: "Solutions" },
              { path: "/community", label: "Community" },
              { path: "/faq", label: "FAQ" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded ${
                  isActive(path)
                    ? " font-[700] text-[#0AADBC]"
                    : "text-black-700 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
            
            {/* Career Dropdown with hover functionality */}
            <div 
              className="relative group" 
              onMouseEnter={() => setCareerDropdownOpen(true)}
              onMouseLeave={() => setCareerDropdownOpen(false)}
            >
              <button 
                className={`px-3 py-2 rounded flex items-center ${
                  isActive("/career") || isActive("/benefits")
                    ? "font-[700] text-[#0AADBC]"
                    : "text-black-700 hover:text-gray-900"
                }`}
              >
                Join Us <FiChevronDown className="ml-1" />
              </button>
              
              <div 
                className={`absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-opacity duration-300 ${
                  careerDropdownOpen ? "opacity-100" : "opacity-0 invisible"
                }`}
                style={{ top: "100%", paddingTop: "10px" }}
              >
                <div className="pt-2"> {/* Added padding to create space between trigger and content */}
                  <Link
                    to="/career"
                    className={`block px-4 py-2 text-sm ${
                      isActive("/career") ? "font-[700] text-[#0AADBC]" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Careers
                  </Link>
                  <Link
                    to="/benefits"
                    className={`block px-4 py-2 text-sm ${
                      isActive("/benefits") ? "font-[700] text-[#0AADBC]" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Benefits
                  </Link>
                </div>
              </div>
            </div>

            {!session ? (
              <button
                onClick={() => navigate("/Login")}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Log In
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Log Out
                </button>
                <Avatar
  src={session?.user?.user_metadata?.avatar_url}
  name={session?.user?.email}
  className="w-8 h-8 rounded-full ml-4"
  // display={{ base: "none", lg: "block" }} 
/>

              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 lg:hidden">
          <div
            ref={drawerRef}
            className="fixed top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg p-6"
          >
            <button
              onClick={toggleDrawer}
              className="mb-6 text-gray-700 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>

            <div className="space-y-6">
              {[
                { path: "/", label: "Home" },
                { path: "/solutions", label: "Solutions" },
                { path: "/about/leadership", label: "About Us" },
                { path: "/community", label: "Community" },
                { path: "/contact", label: "Contact" },
                { path: "/faq", label: "FAQ" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => handleLinkClick(path)}
                  className={`block text-lg text-black font-bold ${
                    isActive(path)
                      ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white px-3 py-2 rounded"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
              
              {/* Career section in mobile */}
              <div className="space-y-2">
                <div className="text-lg text-black font-bold text-gray-700">Join Us</div>
                <Link
                  to="/career"
                  onClick={() => handleLinkClick("/career")}
                  className={`block pl-4 text-md ${
                    isActive("/career")
                      ? "text-[#0AADBC] font-bold"
                      : "text-gray-700"
                  }`}
                >
                  Careers
                </Link>
                <Link
                  to="/benefits"
                  onClick={() => handleLinkClick("/benefits")}
                  className={`block pl-4 text-md ${
                    isActive("/benefits")
                      ? "text-[#0AADBC] font-bold"
                      : "text-gray-700"
                  }`}
                >
                  Benefits
                </Link>
              </div>

              {!session ? (
                <button
                  onClick={() => handleLinkClick("/Login")}
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                >
                  Log In
                </button>
              ) : (
                <>
                  <button
                   onClick={handleLogout}
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Log Out
                  </button>
                  {/* Hide avatar in mobile menu */}
                  {/* <Avatar
                    src={session?.user?.user_metadata?.avatar_url || "/default-avatar.png"}
                    name={session?.user?.email}
                    className="w-8 h-8 rounded-full mt-4"
                  /> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
