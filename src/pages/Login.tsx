import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, BarChart } from "lucide-react";
import services from "../services/services";
import GoogleIcon from "../svg/googleIcon.svg";
import { Image } from "@chakra-ui/react";
import { notification } from "antd";
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
    <div className="min-h-screen bg-black">
      {contextHolder}
      <div className="container mx-auto px-6 py-8">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-16">
          <BarChart className="h-8 w-8 text-white mr-2" />
          <span className="text-2xl text-white">Hushh Technologies LLC</span>
        </Link>

        {/* Login Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

            <button
              type="submit"
              className="w-full flex justify-center gap-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => {
                services.authentication.googleSignIn();
              }}
            >
              <Image src={GoogleIcon} alt="Google Sign In" />
              Google Sign In
            </button>

            {/* <div className="text-sm text-center">
              <a href="#" className="text-black hover:text-red-800 underline">
                Forgot password
              </a>
            </div> */}
          </form>

          <div className="mt-8 space-y-4">
            <div className="text-sm text-gray-700">
              This Hushh Technologies LLC Technologies website
              (www.hushhtech.com) is by invitation only.
            </div>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
              <li>
                If you have received an invitation, you must first create a
                login by following the link provided in the email sent to you.
              </li>
              <li>
                If you have not received an invitation, and think you should
                have, please contact your Hushh Technologies LLC
                representative.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
