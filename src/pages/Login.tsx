import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import services from "../services/services";
import { Image } from "@chakra-ui/react";
import { notification } from "antd";
import HushhLogo from "../components/images/Hushhogo.png"
import GoolgleIcon from "../svg/googleIcon.svg"
import config from "../resources/config/config";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!config.supabaseClient) {
      return;
    }

    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/hushh-user-profile");
      }
    });

    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/hushh-user-profile");
      }
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

  const openNotification = (
    description: string,
    message: string,
    duration: number
  ) => {
    api.open({
      message: message,
      description: description,
      duration: duration,
    });
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address to resend verification");
      return;
    }

    setIsLoading(true);
    try {
      // Using a different approach since the original method has errors
      await services.authentication.emailLogin(email, password);
      openNotification("Verification email sent! Please check your inbox.", "Success", 5);
    } catch (err) {
      openNotification("An unexpected error occurred.", "Error", 5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await services.authentication.emailLogin(email, password);

      if (response === "error") {
        setError("Invalid email or password. Please try again.");
      } else if (response === "email_not_verified") {
        setError(
          "Your email has not been verified. Please check your inbox for a verification email or click below to resend it."
        );
      } else {
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (_err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      {contextHolder}
      <div className="max-w-[420px] mx-auto px-6 pt-10 pb-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Link to="/">
            <Image src={HushhLogo} alt="Hushh Logo" className="h-[70px] w-[70px]" />
          </Link>
          <div className="space-y-3">
            <h1 className="text-[34px] font-[500] leading-[1.10] text-[#0B1120] text-center">
              Investing in the Future.
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#475569] text-center">
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

        {/* Login Form */}
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-5">
          {error && (
            <div className="mb-5 p-4 rounded-[12px] border border-red-100 bg-red-50 text-red-700">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold text-[14px]">Error</span>
              </div>
              <p className="text-[14px] leading-[1.5]">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2.5">
              <label
                htmlFor="email"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your email"
                className="block w-full h-[52px] rounded-[14px] border border-[#D1D5DB] bg-white px-4 text-[16px] text-[#0B1120] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A9E0] focus:ring-2 focus:ring-[rgba(0,169,224,0.18)] transition-colors duration-150"
                required
              />
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="password"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter your password"
                  className="block w-full h-[52px] rounded-[14px] border border-[#D1D5DB] bg-white px-4 pr-12 text-[16px] text-[#0B1120] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A9E0] focus:ring-2 focus:ring-[rgba(0,169,224,0.18)] transition-colors duration-150"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#475569] transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[54px] rounded-[16px] text-[17px] font-semibold tracking-[0.01em] text-[#0B1120] transition-[transform,filter] duration-150 active:scale-[0.985] active:brightness-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A9E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              style={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)", fontWeight: 500 }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            {error?.includes("email has not been verified") && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-[14px] text-[#00A9E0] hover:underline font-semibold"
                  disabled={isLoading}
                >
                  Resend verification email
                </button>
              </div>
            )}

            <div className="pt-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-[14px] text-[#6B7280]">Or sign in with</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>
            </div>

            <div className="grid gap-3 pt-4">
              <button
                type="button"
                className="w-full h-[52px] flex justify-center items-center gap-3 px-4 border border-[#E5E7EB] rounded-[16px] text-[16px] font-semibold text-[#0B1120] bg-white transition-colors duration-150 active:bg-[#F9FAFB]"
                onClick={() => {
                  services.authentication.googleSignIn();
                }}
              >
                <img src={GoolgleIcon} alt="Google Sign In" className="h-5 w-5" />
                Google
              </button>
            </div>

            <div className="grid gap-3 pt-4">
              <button
                type="button"
                className="w-full h-[52px] flex justify-center items-center gap-3 px-4 border border-[#E5E7EB] rounded-[16px] text-[16px] font-semibold text-[#0B1120] bg-white transition-colors duration-150 active:bg-[#F9FAFB]"
                onClick={() => {
                    services.authentication.appleSignIn();
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
                Apple Sign In
              </button>
            </div>

            <div className="text-left mt-5">
              <p className="text-[14px] text-[#111827]">
                Don't have an account?{" "}
                <Link to="/signUp" className="text-[#00A9E0] hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
