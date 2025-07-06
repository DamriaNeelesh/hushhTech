import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Globe, Calendar, Coins, FileText, Settings, Edit3 } from 'lucide-react';
import axios from 'axios';
import resources from '../../resources/resources';

interface UserProfile {
  hushh_id: string;
  name: string;
  city: string;
  country: string;
  email: string;
  zipcode: string | null;
  user_coins: number | null;
  dob: string;
  phone_number: string;
  investor_type: string | null;
  reason_for_using_hushhTech: string;
  accountCreation: string;
  onboard_status: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Get user email from Supabase session and fetch profile
    const fetchUserProfile = async () => {
      try {
        console.log('🔍 Fetching user session...');
        
        if (!resources.config.supabaseClient) {
          console.error("Supabase client is not initialized");
          setError("Authentication service not available");
          setIsLoading(false);
          return;
        }
        
        const { data: { user } } = await resources.config.supabaseClient.auth.getUser();
        
        if (!user?.email) {
          console.log('❌ No user email found, redirecting to login');
          navigate("/login");
          return;
        }
        
        console.log('✅ User email found:', user.email);
        setUserEmail(user.email);
        
        // Check if user exists in database using the API
        await checkUserInDatabase(user.email);
        
      } catch (error) {
        console.error('❌ Error fetching user session:', error);
        setError("Failed to load user session");
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const checkUserInDatabase = async (email: string) => {
    try {
      console.log('🔍 Checking user in database with email:', email);
      
      const response = await axios.get(
        `https://hushh-api-53407187172.us-central1.run.app/api/check-user?email=${email}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('📥 API Response:', response.data);
      
      // Check if user exists based on the API response message
      if (response.data && response.data.message === "User exists" && response.data.user) {
        // User exists in database, extract profile data
        const userData = response.data.user;
        const userProfile = {
          hushh_id: userData.hushh_id || userData.hushh_id_uuid || "N/A",
          name: userData.name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || "N/A",
          city: userData.city || "N/A",
          country: userData.country || "N/A",
          email: userData.email || email,
          zipcode: userData.zipcode || null,
          user_coins: userData.user_coins || 0,
          dob: userData.dob || "N/A",
          phone_number: userData.phone_number || userData.phone || "N/A",
          investor_type: userData.investor_type || null,
          reason_for_using_hushhTech: userData.reason_for_using_hushhTech || userData.selected_reason_for_using_hushh || "N/A",
          accountCreation: userData.accountCreation || userData.creationtime || "N/A",
          onboard_status: userData.onboard_status || "N/A"
        };
        
        console.log('✅ User profile created:', userProfile);
        setUserProfile(userProfile);
        
        // Also store in localStorage for backup
        localStorage.setItem('hushhUserProfile', JSON.stringify(userProfile));
        
      } else if (response.data && response.data.message === "User does not exist") {
        // User doesn't exist, redirect to registration
        console.log('❌ User not found in database, redirecting to registration');
        navigate("/user-registration");
        return;
      } else {
        console.log('❌ Unexpected API response:', response.data);
        setError("Unexpected response from server");
        
        // Check localStorage as fallback
        const storedProfile = localStorage.getItem('hushhUserProfile');
        if (storedProfile) {
          try {
            const profile = JSON.parse(storedProfile);
            console.log('✅ Found profile in localStorage:', profile);
            setUserProfile(profile);
          } catch (parseError) {
            console.error('❌ Error parsing localStorage profile:', parseError);
            // If localStorage fails, redirect to registration
            navigate("/user-registration");
            return;
          }
        } else {
          // No localStorage data, redirect to registration
          navigate("/user-registration");
          return;
        }
      }
      
    } catch (error: any) {
      console.error('❌ Error checking user in database:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        
        // If it's a 404 or the response says user doesn't exist, redirect to registration
        if (error.response.status === 404 || 
            (error.response.data && error.response.data.message === "User does not exist")) {
          console.log('❌ User not found (404 or not found message), redirecting to registration');
          navigate("/user-registration");
          return;
        }
        
        setError(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        setError("Network error - please check your connection");
      } else {
        setError("Failed to check user data");
      }
      
      // Try localStorage as fallback
      const storedProfile = localStorage.getItem('hushhUserProfile');
      if (storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          console.log('✅ Using localStorage profile as fallback:', profile);
          setUserProfile(profile);
          setError(null); // Clear error if we found localStorage data
        } catch (parseError) {
          console.error('❌ Error parsing localStorage profile:', parseError);
          // If localStorage fails and we have an error, redirect to registration
          navigate("/user-registration");
          return;
        }
      } else {
        // No localStorage data and we have an error, redirect to registration
        navigate("/user-registration");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatAccountCreation = (dateString: string) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Loading</h2>
          
          {error ? (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm font-medium">Error: {error}</p>
              <p className="text-red-600 text-xs mt-1">Redirecting to registration...</p>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">Please wait while we check your registration status...</p>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-registration')}
              className="w-full px-6 py-3 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 transition-colors"
            >
              Complete Registration
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{userProfile.name}</h1>
                  <p className="text-gray-600 mt-1">Hushh ID: {userProfile.hushh_id}</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    userProfile.onboard_status === 'authenticated' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {userProfile.onboard_status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/user-registration')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="h-5 w-5 text-cyan-400 mr-2" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium text-gray-800">{userProfile.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-cyan-400 mr-2" />
              Location
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="font-medium text-gray-800 capitalize">{userProfile.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium text-gray-800">{userProfile.city}</p>
                </div>
              </div>
              {userProfile.zipcode && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Zip Code</p>
                    <p className="font-medium text-gray-800">{userProfile.zipcode}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal & Investment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-cyan-400 mr-2" />
              Personal Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-800">{formatDate(userProfile.dob)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Coins className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Hushh Coins</p>
                  <p className="font-medium text-gray-800">{userProfile.user_coins || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="h-5 w-5 text-cyan-400 mr-2" />
              Investment Profile
            </h3>
            <div className="space-y-4">
              {userProfile.investor_type && (
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Investor Type</p>
                    <p className="font-medium text-gray-800">{userProfile.investor_type}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="font-medium text-gray-800">{formatAccountCreation(userProfile.accountCreation)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reason for Using HushhTech */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-cyan-400 mr-2" />
            About Your Interest
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {userProfile.reason_for_using_hushhTech || 'No reason provided'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 transition-colors flex items-center space-x-2"
          >
            {/* <Edit3 className="h-4 w-4" /> */}
            <span>Go to NDA & KYC Form</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Debug Section - Remove in production */}
        {/* <div className="mt-8 bg-gray-100 rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-gray-700 mb-2">Debug Information:</h4>
          <div className="space-y-2">
            <p><strong>User Email:</strong> {userEmail}</p>
            <p><strong>API Endpoint:</strong> check-user</p>
            <p><strong>localStorage Key:</strong> hushhUserProfile</p>
            <p><strong>Profile Source:</strong> {error ? 'localStorage (API failed)' : 'API Database'}</p>
            <p><strong>Last Error:</strong> {error || 'None'}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => {
                  if (userEmail) {
                    setIsLoading(true);
                    checkUserInDatabase(userEmail);
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
              >
                Refresh from API
              </button>
              <button
                onClick={() => {
                  console.log('🔍 Current user profile:', userProfile);
                  console.log('🔍 localStorage contents:', localStorage.getItem('hushhUserProfile'));
                  console.log('🔍 User email:', userEmail);
                  console.log('🔍 Current error:', error);
                  alert('Check console for debug information');
                }}
                className="px-3 py-1 bg-green-500 text-white rounded text-xs"
              >
                Check Console
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('hushhUserProfile');
                  window.location.reload();
                }}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs"
              >
                Clear & Reload
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;