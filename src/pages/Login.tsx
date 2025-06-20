import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import services from "../services/services";
import { Image } from "@chakra-ui/react";
import { notification } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {contextHolder}
      <div className="container max-w-lg mx-auto px-6 py-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center mb-10">
          <Link to="/" className="mb-2">
            <Image src="/hushhLogo.png" alt="Hushh Logo" className="w-32 h-32" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 text-center">Log In to Hushh Technologies</h1>
          <p className="text-gray-600 mt-2 text-center">Access your investment dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-100 text-red-700">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors disabled:opacity-70"
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                setError(null);
                
                try {
                  let response = await services.authentication.emailLogin(email, password);
                  
                  if (response === "error") {
                    setError("Invalid email or password. Please try again.");
                  } else if (response === "email_not_verified") {
                    setError(
                      "Your email has not been verified. Please check your inbox for a verification email or click below to resend it."
                    );
                  } else {
                    // Successful login, redirect to user registration page
                    localStorage.setItem("isLoggedIn", "true");
                    navigate("/user-registration");
                  }
                } catch (err) {
                  setError("An unexpected error occurred. Please try again later.");
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            {error?.includes("email has not been verified") && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
                  disabled={isLoading}
                >
                  Resend verification email
                </button>
              </div>
            )}

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="grid  gap-3">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                onClick={() => {
                  // Pass an empty function as we'll handle the redirect in the googleSignIn implementation
                  services.authentication.googleSignIn(() => {
                    // After successful Google sign-in, redirect to registration page
                    navigate("/user-registration");
                  });
                }}
              >
                <img src="/google-icon.svg" alt="Google Sign In" className="h-5 w-5" />
                Google
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-black">
                Don't have an account? <Link to="/signUp" className="text-cyan-400 hover:text-cyan-500">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
