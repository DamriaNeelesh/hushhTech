import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../resources/config/config";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Function to handle PDF download
  const handleDownload = (pdfPath) => {
    if (isLoggedIn) {
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = pdfPath.split("/").pop() || "download";
      link.click();
    } else {
      toast.error("Please log in first to access this content.");
    }
  };

  return (
    <footer className="text-white mt-auto py-12 px-4" style={{ backgroundColor: 'rgb(42 59 71 / var(--tw-bg-opacity, 1))' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Hushh 🤫 Technologies LLC</h3>
            <div className="space-y-2 text-gray-300">
              <p>1021 5th St W, Kirkland, WA 98033</p>
              <p>Phone: +14252969050</p>
              <p>Office Hours: Mon-Fri 9AM-6PM PST</p>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <a href="/about" className="block text-gray-300 hover:text-white transition">About Us</a>
                <a href="/discover-fund-a" className="block text-gray-300 hover:text-white transition">Fund A</a>
                <a href="https://www.hushh.ai/solutions" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white transition">Solutions</a>
                <a href="/benefits" className="block text-gray-300 hover:text-white transition">Benefits</a>
                <a href="/careers" className="block text-gray-300 hover:text-white transition">Careers</a>
              </div>
              <div className="space-y-2">
                <a href="/community" className="block text-gray-300 hover:text-white transition">Community</a>
                <a href="/faq" className="block text-gray-300 hover:text-white transition">FAQ</a>
                <a href="/contact" className="block text-gray-300 hover:text-white transition">Contact</a>
                <a href="/kyc-verification" className="block text-gray-300 hover:text-white transition">KYC Verification</a>
              </div>
            </div>
          </div>
          
          {/* Column 3: Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Legal</h3>
            <div className="space-y-2 text-gray-300">
              <a href="/privacy-policy" className="block hover:text-white transition">
                Website Privacy Policy
              </a>
              <a href="/eu-uk-jobs-privacy-policy" className="block hover:text-white transition">
                EU and UK Privacy Policies
              </a>
              <a href="/california-privacy-policy" className="block hover:text-white transition">
                California Privacy Policy
              </a>
              <a href="/carrer-privacy-policy" className="block hover:text-white transition">
                Careers Site Privacy Notice
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>
        
        {/* Bottom Text */}
        <div className="text-sm text-gray-400 text-center">
          <p className="mb-2">© 2025 Hushh  All Rights Reserved.</p>
          <p>
            Disclaimer: Investment involves risk. Past performance does not guarantee future results. Please consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
      
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </footer>
  );
}
