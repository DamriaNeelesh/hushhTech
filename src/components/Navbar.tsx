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
  const [mobileCareerDropdownOpen, setMobileCareerDropdownOpen] = useState(false);
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
          <Image src={hushhLogo} alt="Hushh Logo" className="w-12 h-12"/>
            <p className="text-xl font-[500] blue-gradient-text">Hushh Technologies</p>
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
                  className={`block text-lg ${
                    isActive(path)
                      ? "font-[700] text-[#0AADBC]"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {label}
                </Link>
              ))}
              
              {/* Career section in mobile */}
              <div className="space-y-2">
                <div className="relative">
                  <button 
                    onClick={() => setMobileCareerDropdownOpen(!mobileCareerDropdownOpen)}
                    className={`flex items-center text-lg focus:outline-none ${
                      isActive("/career") || isActive("/benefits")
                        ? "font-[700] text-[#0AADBC]"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Join Us
                    <FiChevronDown className={`ml-1 transition-transform duration-200 ${mobileCareerDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div className={`mt-2 pl-2 transition-all duration-300 overflow-hidden ${
                    mobileCareerDropdownOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <Link
                      to="/career"
                      onClick={() => handleLinkClick("/career")}
                      className={`block py-2 text-lg ${
                        isActive("/career")
                          ? "font-[700] text-[#0AADBC]"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Careers
                    </Link>
                    <Link
                      to="/benefits"
                      onClick={() => handleLinkClick("/benefits")}
                      className={`block py-2 text-lg ${
                        isActive("/benefits")
                          ? "font-[700] text-[#0AADBC]"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Benefits
                    </Link>
                  </div>
                </div>
              </div>

              {!session ? (
                <button
                  onClick={() => handleLinkClick("/Login")}
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
                  {/* <div className="flex items-center mt-4">
                    <Avatar
                      src={session?.user?.user_metadata?.avatar_url}
                      name={session?.user?.email}
                      className="w-8 h-8 rounded-full"
                    />
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
