import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import resources from "../resources/resources";
import { notification } from "antd";
import axios from "axios";

// API configuration - Production API endpoint
const API_ENDPOINT = "https://hushh-api-53407187172.us-central1.run.app/api/hushhtech-wrapper";

console.log("=== API Configuration ===");
console.log("API Endpoint:", API_ENDPOINT);

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  country: string;
  city: string;
  dob: string;
  reason_for_using: string;
  investor_type: string;
}

export default function UserRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [userEmail, setUserEmail] = useState("");
  
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reasonForUsingHushh, setReasonForUsingHushh] = useState("");
  const [investorType, setInvestorType] = useState("");

  useEffect(() => {
    // Get user email from Supabase session
    const getUserData = async () => {
      try {
        if (!resources.config.supabaseClient) {
          console.error("Supabase client is not initialized");
          navigate("/login");
          return;
        }
        
        const { data: { user } } = await resources.config.supabaseClient.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
          setUserId(user.id);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    getUserData();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create user data object matching the API structure
      const userData: UserData = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        phone_number: phoneNumber,
        gender: gender,
        country: country.toLowerCase(),
        city: city,
        dob: dateOfBirth,
        reason_for_using: reasonForUsingHushh,
        investor_type: investorType,
      };

      console.log("=== API Request Debug Info ===");
      console.log("Final API Endpoint:", API_ENDPOINT);
      console.log("Request Method: POST");
      console.log("Request Payload:", JSON.stringify(userData, null, 2));
      console.log("Current URL:", window.location.href);

      // Make the API request with explicit configuration
      const response = await axios({
        method: 'POST',
        url: API_ENDPOINT,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: userData,
        timeout: 30000,
        // Explicitly disable proxy
        proxy: false,
      });
      
      console.log("=== API Response Debug Info ===");
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      console.log("Response Data:", response.data);
      
      // Extract and store user profile data from response
      if (response.data && response.data.user) {
        const userProfile = {
          hushh_id: response.data.user.hushh_id,
          name: response.data.user.name || `${response.data.user.first_name} ${response.data.user.last_name}`,
          city: response.data.user.city,
          country: response.data.user.country,
          email: response.data.user.email,
          zipcode: response.data.user.zipcode,
          user_coins: response.data.user.user_coins,
          dob: response.data.user.dob,
          phone_number: response.data.user.phone_number,
          investor_type: response.data.user.investor_type,
          reason_for_using_hushhTech: response.data.user.reason_for_using_hushhTech,
          accountCreation: response.data.user.accountCreation,
          onboard_status: response.data.user.onboard_status
        };
        
        // Store user profile data in localStorage
        localStorage.setItem('hushhUserProfile', JSON.stringify(userProfile));
        
        console.log("User profile stored:", userProfile);
      }

      openNotification("Your profile has been created successfully!", "Success", 3);
      
      // Redirect to profile page after successful registration
      setTimeout(() => {
        navigate("/your-profile");
      }, 2000);
    } catch (err: any) {
      console.error("=== API Error Debug Info ===");

      
      // More detailed error handling
      let errorMessage = "An unexpected error occurred. Please try again later.";
      
      if (err.response) {
        // Server responded with error status
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        console.error("Error response data:", err.response.data);
        console.error("Actual request URL:", err.response.config?.url);
        
        errorMessage = `Registration failed (${err.response.status}): ${
          err.response.data?.message || 
          err.response.data?.error || 
          err.response.statusText ||
          'Server error'
        }`;
      } else if (err.request) {
        // Request was made but no response
        console.error("No response received:", err.request);
        console.error("Request URL that was attempted:", err.config?.url);
        console.error("Request method:", err.config?.method);
        console.error("Request headers:", err.config?.headers);
        
        if (err.code === 'ECONNABORTED') {
          errorMessage = "Request timeout. Please check your internet connection and try again.";
        } else if (err.code === 'ERR_NETWORK') {
          errorMessage = "Network error. Please check your internet connection or try again later.";
        } else if (err.message?.includes('CORS')) {
          errorMessage = "CORS error. The server may not be configured to accept requests from this domain.";
        } else {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      } else {
        // Something else happened
        console.error("Request setup error:", err.message);
        errorMessage = `Request error: ${err.message}`;
      }
      
      console.error("Final error message:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {contextHolder}
      <div className="container max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Please provide the following information to complete your registration
          </p>
        </div>

        {/* Registration Form */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Investor Type Field - At the top */}
            <div>
              <label htmlFor="investorType" className="block text-sm font-medium text-gray-700 mb-1">
                What type of investor are you?
              </label>
              <select
                id="investorType"
                value={investorType}
                onChange={(e) => setInvestorType(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              >
                <option value="">Select investor type</option>
                <option value="Individual Investor">Individual Investor</option>
                <option value="Institutional / Corporate Investor">Institutional / Corporate Investor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email Address"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter your country"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label htmlFor="reasonForUsingHushh" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for using Hushh
              </label>
              <textarea
                id="reasonForUsingHushh"
                value={reasonForUsingHushh}
                onChange={(e) => setReasonForUsingHushh(e.target.value)}
                placeholder="Tell us why you're interested in using Hushh"
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                rows={3}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
