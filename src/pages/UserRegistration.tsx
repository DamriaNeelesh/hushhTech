import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import resources from "../resources/resources";
import { notification } from "antd";
import axios from "axios";
import Select from "react-select";
import { Country, City } from "country-state-city";
import APITestButton from "../components/APITestButton";

// API configuration
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_HEADERS = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

interface UserData {
  id?: number;
  hushh_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender?: string;
  country?: string;
  city?: string;
  address?: string;
  dob?: string;
  selected_reason_for_using_hushh?: string;
  user_coins?: number;
  investor_type?: string;
  is_hushh_app_user?: boolean;
  private_mode?: boolean;
  onboard_status?: string;
  accountCreation?: string;
}

export default function UserRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [userEmail, setUserEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(""); // Store the initial email for comparison
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Form fields - Only the ones that can be updated
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userCoins, setUserCoins] = useState<number>(0);
  const [investorType, setInvestorType] = useState("");
  
  // Form fields - Read-only for display purposes in update mode
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reasonForUsingHushh, setReasonForUsingHushh] = useState("");

  // Country and City dropdown options using country-state-city library
  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
      flag: country.flag
    }));
  }, []);
  
  // Cities based on selected country
  const cityOptions = useMemo(() => {
    if (!country) return [];
    
    const cities = City.getCitiesOfCountry(country);
    return cities ? cities.map((city) => ({
      value: city.name,
      label: city.name
    })) : [];
  }, [country]);

  // Helper function to get country label from value
  const getCountryLabel = (countryValue: string) => {
    const country = countryOptions.find(option => option.value === countryValue);
    return country ? country.label : countryValue;
  };

  // Helper function to get country code from name (for reverse mapping when loading existing data)
  const getCountryCode = (countryName: string) => {
    const country = countryOptions.find(option => option.label === countryName);
    return country ? country.value : countryName;
  };

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
          setInitialEmail(user.email); // Store the initial email
          // Check if user already exists in the system
          checkExistingUser(user.email);
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

  const checkExistingUser = async (email: string) => {
    try {
      // Call the search API to check if user already exists
      const response = await axios.get(
        `https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1/users?or=(email.ilike.*${email}*)`,
        { headers: API_HEADERS }
      );
      
      if (response.data && response.data.length > 0) {
        // User already exists, load their data for updating
        const userData = response.data[0];
        setIsUpdateMode(true);
        setUserId(userData.hushh_id);
        
        // Populate form fields with existing data - Only updatable fields
        setFirstName(userData.first_name || "");
        setLastName(userData.last_name || "");
        setPhoneNumber(userData.phone_number || "");
        setUserCoins(userData.user_coins || 0);
        setInvestorType(userData.investor_type || "");
        
        // Store read-only fields for display purposes
        setGender(userData.gender || "");
        setCountry(getCountryCode(userData.country || "")); // Convert country name back to ISO code for form
        setCity(userData.city || "");
        setAddress(userData.address || "");
        setDateOfBirth(userData.dob || "");
        setReasonForUsingHushh(userData.selected_reason_for_using_hushh || "");
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      // Continue with registration form even if API check fails
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create user data object with only updatable fields
      const userData: UserData = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        phone_number: phoneNumber,
        investor_type: investorType,
      };

      // For update mode, also send country and city if they exist
      if (isUpdateMode && country) {
        userData.country = getCountryLabel(country);
        userData.city = city;
      }

      // If updating, include user_coins
      if (isUpdateMode) {
        userData.user_coins = userCoins;
      } else {
        // For new users, include all required fields
        userData.gender = gender;
        userData.country = getCountryLabel(country); // Send country name instead of code
        userData.city = city;
        userData.address = address;
        userData.dob = dateOfBirth;
        userData.selected_reason_for_using_hushh = reasonForUsingHushh;
        userData.user_coins = 0;
        userData.is_hushh_app_user = true;
        userData.private_mode = false;
        userData.onboard_status = "authenticated";
        userData.accountCreation = new Date().toISOString();
      }

      let response;
      
      if (isUpdateMode && userId) {
        // Update existing user with PATCH request - only updatable fields
        response = await axios.patch(
          `https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1/users?hushh_id=eq.${userId}`,
          userData,
          { headers: API_HEADERS }
        );
        
        // If email has been changed, update the Supabase auth email as well
        if (userEmail !== initialEmail && resources.config.supabaseClient) {
          try {
            await resources.config.supabaseClient.auth.updateUser({ email: userEmail });
            openNotification(
              "Your email has been updated. Please check your new email for a confirmation link.", 
              "Email Update", 
              5
            );
          } catch (emailError) {
            console.error("Error updating email in auth:", emailError);
            openNotification(
              "Your profile was updated, but there was an issue updating your email. Please try again later.", 
              "Warning", 
              5
            );
          }
        } else {
          openNotification("Your profile has been updated successfully!", "Success", 3);
        }
      } else {
        // Create new user with POST request
        response = await axios.post(
          "https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1/users", 
          userData,
          { headers: API_HEADERS }
        );
        
        openNotification("Your profile has been created successfully!", "Success", 3);
      }
      
      // Redirect to home page after successful registration/update
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Registration/Update error:", err);
      setError(`An unexpected error occurred. Please try again later. ${isUpdateMode ? 'Update' : 'Registration'} failed.`);
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
            {isUpdateMode ? "Update Your Profile" : "Complete Your Profile"}
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            {isUpdateMode 
              ? "Update your profile information below" 
              : "Please provide the following information to complete your registration"}
          </p>
        </div>

        {/* Registration/Update Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {/* Test Button - Remove in production */}
          <APITestButton />
          
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

            {/* Updatable fields */}
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
              {isUpdateMode && userEmail !== initialEmail && (
                <p className="mt-1 text-sm text-amber-600">
                  Changing your email will require verification of your new email address.
                </p>
              )}
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

            {isUpdateMode && (
              <div>
                <label htmlFor="userCoins" className="block text-sm font-medium text-gray-700 mb-1">
                  User Coins
                </label>
                <input
                  type="number"
                  id="userCoins"
                  value={userCoins}
                  onChange={(e) => setUserCoins(parseInt(e.target.value) || 0)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
            )}

            {/* Read-only fields in update mode */}
            {isUpdateMode && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Additional Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                    <p className="text-gray-800">{gender || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                    <p className="text-gray-800">{dateOfBirth || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>
                    <p className="text-gray-800">{country ? getCountryLabel(country) : "Not provided"}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                    <p className="text-gray-800">{city || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                  <p className="text-gray-800">{address || "Not provided"}</p>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Reason for using Hushh</label>
                  <p className="text-gray-800">{reasonForUsingHushh || "Not provided"}</p>
                </div>
              </div>
            )}

            {/* Non-update mode fields for initial registration */}
            {!isUpdateMode && (
              <>
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
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(option => option.value === country)}
                      onChange={(selectedOption) => {
                        setCountry(selectedOption?.value || "");
                        setCity(""); // Reset city when country changes
                      }}
                      placeholder="Select Country"
                      isSearchable
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '16px',
                          '&:hover': {
                            borderColor: '#06b6d4'
                          },
                          '&:focus-within': {
                            borderColor: '#06b6d4',
                            boxShadow: '0 0 0 1px #06b6d4'
                          }
                        })
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Select
                      options={cityOptions}
                      value={cityOptions.find(option => option.value === city)}
                      onChange={(selectedOption) => setCity(selectedOption?.value || "")}
                      placeholder={country ? "Select City" : "Select country first"}
                      isSearchable
                      isDisabled={!country}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '16px',
                          backgroundColor: state.isDisabled ? '#f9fafb' : 'white',
                          '&:hover': {
                            borderColor: state.isDisabled ? '#d1d5db' : '#06b6d4'
                          },
                          '&:focus-within': {
                            borderColor: state.isDisabled ? '#d1d5db' : '#06b6d4',
                            boxShadow: state.isDisabled ? 'none' : '0 0 0 1px #06b6d4'
                          }
                        })
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                    required
                  />
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
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading 
                ? (isUpdateMode ? "Updating..." : "Submitting...") 
                : (isUpdateMode ? "Update Profile" : "Complete Registration")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 