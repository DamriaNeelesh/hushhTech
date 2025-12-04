import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import services from "../services/services";
import HushhLogo from "../components/images/Hushhogo.png";
import config from "../resources/config/config";
import GoogleIcon from "../svg/googleIcon.svg";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await config.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setSuccess(null);
      } else {
        if (data?.user?.identities?.length === 0) {
          setError("This email is already registered. Please log in instead.");
        } else {
          setSuccess(
            "Signup successful! Please check your email for a confirmation link to complete your registration. You will not be able to log in until you verify your email."
          );
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFullName("");
          setAgreedToTerms(false);
        }
        setError(null);
      }
    } catch (_err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[420px] mx-auto px-6 pt-10 pb-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-start gap-4 mb-6">
          <Image src={HushhLogo} alt="Hushh Logo" className="h-11 w-11" />
          <div className="space-y-3">
            <h1 className="text-[36px] font-[700] leading-[1.10] text-[#0B1120]">
              Create Your Hushh Account
            </h1>
            <p className="text-[18px] leading-[1.65] text-[#475569] max-w-[32ch]">
              Join the future of intelligent investing.
            </p>
          </div>
          <div className="relative h-px w-full bg-[#E5E7EB]">
            <span
              aria-hidden
              className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#00A9E0]"
            />
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-5">
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2.5">
              <label
                htmlFor="fullName"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="block w-full h-[52px] rounded-[14px] border border-[#D1D5DB] bg-white px-4 text-[16px] text-[#0B1120] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A9E0] focus:ring-2 focus:ring-[rgba(0,169,224,0.18)] transition-colors duration-150"
                required
              />
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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

            <div className="space-y-2.5">
              <label
                htmlFor="confirmPassword"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="block w-full h-[52px] rounded-[14px] border border-[#D1D5DB] bg-white px-4 pr-12 text-[16px] text-[#0B1120] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A9E0] focus:ring-2 focus:ring-[rgba(0,169,224,0.18)] transition-colors duration-150"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#475569] transition-colors duration-150"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-[18px] w-[18px] rounded-[4px] border border-[#D1D5DB] text-[#00A9E0] focus:ring-1 focus:ring-[#00A9E0]"
              />
              <label htmlFor="terms" className="text-[14px] leading-[1.45] text-[#475569]">
                I agree to the{" "}
                <a href="/terms" className="text-[#00A9E0] underline-offset-2 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#00A9E0] underline-offset-2 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="pt-2 space-y-4">
              <div className="relative h-px w-full bg-[#E5E7EB]">
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#00A9E0]"
                />
              </div>
              <button
                type="submit"
                className="w-full h-[54px] rounded-[16px] text-[17px] font-semibold tracking-[0.01em] text-[#0B1120] transition-[transform,filter] duration-150 active:scale-[0.985] active:brightness-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A9E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                style={{ background: "linear-gradient(to right, #00A9E0, #6DD3EF)", fontWeight: 650 }}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-[14px] text-[#6B7280]">Or sign up with</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              <div className="mt-4 space-y-3">
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
                  <span role="img" aria-label="apple" className="text-[18px] leading-none"></span>
                  Apple
                </button>
              </div>
            </div>
          </form>

          <div className="text-left mt-6">
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
