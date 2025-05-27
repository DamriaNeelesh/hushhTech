import React, { useState } from "react";
import { Link } from "react-router-dom";
import resources from "../resources/resources";
import services from "../services/services";
import { Image } from "@chakra-ui/react";
import GoogleIcon from "../svg/googleIcon.svg";
import { BarChart, Eye, EyeOff } from "lucide-react";
import HushhLogo from "../components/images/Hushhogo.png";
import config from "../resources/config/config";
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
      // Sign up with email confirmation enabled
      const { data, error } = await config.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          // This ensures the user needs to confirm their email
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setError(error.message);
        setSuccess(null);
      } else {
        // Check if email confirmation is sent
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
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container max-w-lg mx-auto px-6 py-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center my-10">
          <Image src={HushhLogo} alt="Hushh Logo" className="h-14 w-14" />
          <h1 className="text-3xl font-bold text-gray-800 text-center">Create Your Hushh Account</h1>
          <p className="text-gray-600 mt-2 text-center">Join the future of intelligent investing</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the {' '}
                <a href="/terms" className="text-cyan-400 hover:text-cyan-500">
                  Terms of Service
                </a> and {' '}
                <a href="/privacy" className="text-cyan-400 hover:text-cyan-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid  gap-3">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                onClick={() => {
                  services.authentication.googleSignIn();
                }}
              >
                <Image src={GoogleIcon} alt="Google Sign In" className="h-5 w-5" />
                Google
              </button>
              
             
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account? {' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-500 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
