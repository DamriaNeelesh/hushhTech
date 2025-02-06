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
    <footer className="bg-white text-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Use a three-column grid on medium screens and above */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">USA</h3>
            <p>Hushh 🤫 Technologies LLC</p>
            <p>1021 5th St W, Kirkland, WA 98033</p>
            <p>+1 (765) 532-4284</p>
            <p>Office Hours: 10:00 AM-7:00 PM</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-col text-sm space-y-2 text-gray-400 text-right">
              <a href="/privacy-policy" className="hover:text-gray-600">
                Website Privacy Policy
              </a>
              <a href="/eu-uk-jobs-privacy-policy" className="hover:text-gray-600">
                EU and UK Privacy Policies
              </a>
              <a href="/california-privacy-policy" className="hover:text-gray-600">
              California Privacy Policy
              </a>
              <a href="/carrer-privacy-policy" className="hover:text-gray-600">
              Careers Site Privacy Notice
              </a>
            </div>
          </div>
          {/* Column 2: Download Links */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col text-sm space-y-2 text-gray-400 text-right">
              <a
                onClick={() =>
                  handleDownload(
                    "https://drive.google.com/file/d/1OKCfvFrZG9vqDgf4SNEHJ0sb5rc0oNWE/view?usp=sharing"
                  )
                }
                className="hover:text-gray-600 cursor-pointer"
              >
                History and Milestones
              </a>
              <a
                onClick={() =>
                  handleDownload(
                    "https://drive.google.com/file/d/1p9ZzyADuJzR9wWpGyI6BEcf-2ool_W3b/view?usp=sharing"
                  )
                }
                className="hover:text-gray-600 cursor-pointer"
              >
                Strategy and Profit Projection
              </a>
              <a
                onClick={() =>
                  handleDownload(
                    "https://drive.google.com/file/d/1S1On2qBqgeu2k9Qru9B0qmYBqMAIwOTs/view?usp=sharing"
                  )
                }
                className="hover:text-gray-600 cursor-pointer"
              >
                Letter to Shareholders
              </a>
              <a href="/Faq" className="hover:text-gray-600">
                FAQs
              </a>
            </div>
          </div>
          {/* Column 3: Additional Links */}
          
        </div>
        {/* Bottom Text */}
        <div className="mt-8 text-sm text-gray-400">
          <p>© 2024 Hushh 🤫 Technologies LLC. All Rights Reserved.</p>
          <p className="mt-2">
            The materials on this website are for illustration and discussion
            purposes only and do not constitute an offering. An offering may be
            made only by delivery of a confidential offering memorandum to
            appropriate investors. PAST PERFORMANCE IS NO GUARANTEE OF FUTURE
            RESULTS.
          </p>
        </div>
      </div>
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </footer>
  );
}
