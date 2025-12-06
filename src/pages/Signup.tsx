import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import services from "../services/services";
import HushhLogo from "../components/images/Hushhogo.png";
import GoogleIcon from "../svg/googleIcon.svg";

export default function Signup() {

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center pt-20"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[420px] mx-auto px-6 py-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Image src={HushhLogo} alt="Hushh Logo" className="h-11 w-11" />
          <div className="space-y-3">
            <h1 className="text-[36px] font-[500] leading-[1.10] text-[#0B1120] text-center">
              Investing in the Future.
            </h1>
            <p className="text-[18px] leading-[1.65] text-[#475569] text-center mx-auto">
              The AI-Powered Berkshire Hathaway.

We combine AI and human expertise to invest in exceptional businesses for long-term value creation.
            </p>
          </div>
          <div className="relative h-px w-full bg-[#E5E7EB]">
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 bg-[#00A9E0]"
            />
          </div>
        </div>

        {/* Signup Options */}
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-5">
          <div className="space-y-3">
            <button
              type="button"
              className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-white flex items-center justify-center gap-3 text-[16px] font-semibold text-[#0B1120] transition-colors duration-150 active:bg-[#F9FAFB]"
              onClick={() => {
                services.authentication.googleSignIn();
              }}
            >
              <Image src={GoogleIcon} alt="Google Sign In" className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-white flex items-center justify-center gap-3 text-[16px] font-semibold text-[#0B1120] transition-colors duration-150 active:bg-[#F9FAFB]"
              onClick={() => {
                services.authentication.appleSignIn();
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-[14px] text-[#6B7280]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00A9E0] underline-offset-2 hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
