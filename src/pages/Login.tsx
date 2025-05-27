import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, BarChart } from "lucide-react";
import services from "../services/services";
import GoogleIcon from "../svg/googleIcon.svg";
import { Image } from "@chakra-ui/react";
import { notification } from "antd";
import hushhLogo from "../components/images/Hushhogo.png";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container max-w-lg mx-auto px-6 py-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center mb-10">
          <Link to="/" className="mb-2">
          <Image src={hushhLogo} alt="Hushh Logo" className="w-32 h-32" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 text-center">Log In to Hushh Technologies</h1>
          <p className="text-gray-600 mt-2 text-center">Access your investment dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
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
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors"
              onClick={async () => {
                let response = await services.authentication.emailLogin(
                  email,
                  password
                );
                if (response == "error") {
                  openNotification(
                    "Invalid Credentials, Please try again",
                    "Error",
                    0
                  );
                }
              }}
            >
              Log in
            </button>

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
                  services.authentication.googleSignIn();
                }}
              >
                <Image src={GoogleIcon} alt="Google Sign In" className="h-5 w-5" />
                Google
              </button>
              
              {/* <button
                type="button"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                Apple
              </button> */}
            </div>

            {/* <div className="text-center mt-4">
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-500">
                Forgot password?
              </a>
            </div> */}

            <div className="text-center mt-4">
              <p className="text-sm text-black">
                Don't have an account? <Link to="/signUp" className="text-cyan-400 hover:text-cyan-500">Sign up</Link>
              </p>
            </div>
          </form>
        </div>

        {/* <div className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700">
            This Hushh 🤫 Technologies LLC website
            (www.hushhtech.com) is by invitation only.
          </div>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>
              If you have received an invitation, you must first create a
              login by following the link provided in the email sent to you.
            </li>
            <li>
              If you have not received an invitation, and think you should
              have, please contact your Hushh 🤫 Technologies LLC
              representative.
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
