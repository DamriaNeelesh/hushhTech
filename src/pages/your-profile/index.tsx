import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Globe, Calendar, Coins, FileText, Settings, Edit3 } from 'lucide-react';
import axios from 'axios';
import resources from '../../resources/resources';
import services from '../../services/services';
import { UserPreferenceProfile } from '../../types/preferences';

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
  const [userId, setUserId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferenceProfile | null>(null);

  const formatList = (items?: string[]) => (items && items.length > 0 ? items.join(", ") : "unknown");

  const formatBudget = (budget?: { currency: string; min: number | null; max: number | null }) => {
    if (!budget) return "unknown";
    const min = budget.min !== null && budget.min !== undefined ? budget.min : "0";
    const max = budget.max !== null && budget.max !== undefined ? budget.max : "0";
    return `${budget.currency} ${min} - ${max}`;
  };

  const formatDateTime = (value?: string) => {
    if (!value) return "Not available";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  const loadPreferences = async (supabaseUserId: string) => {
    try {
      const dbPreferences = await services.preferences.fetchPreferences(supabaseUserId);
      if (dbPreferences) {
        setPreferences(dbPreferences);
        localStorage.setItem("hushhUserPreferences", JSON.stringify(dbPreferences));
        return;
      }
    } catch (prefError) {
      console.error("Error loading preferences from Supabase:", prefError);
    }

    const stored = localStorage.getItem("hushhUserPreferences");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserPreferenceProfile;
        setPreferences(parsed);
      } catch (parseError) {
        console.error("Failed to parse stored preferences:", parseError);
      }
    }
  };

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
        setUserId(user.id);

        await loadPreferences(user.id);
        
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
      
      if (response.data && response.data.user) {
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
        
      } else {
        console.log('❌ User not found in database');
        setError("User not found in database");
        
        // Check localStorage as fallback
        const storedProfile = localStorage.getItem('hushhUserProfile');
        if (storedProfile) {
          try {
            const profile = JSON.parse(storedProfile);
            console.log('✅ Found profile in localStorage:', profile);
            setUserProfile(profile);
          } catch (parseError) {
            console.error('❌ Error parsing localStorage profile:', parseError);
          }
        }
      }
      
    } catch (error: any) {
      console.error('❌ Error checking user in database:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
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
        }
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Profile Found</h2>
          
          {error ? (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm font-medium">Error: {error}</p>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">You haven't completed your registration yet.</p>
          )}
          
          {/* Debug Section */}
          {/* <div className="bg-gray-100 rounded-lg p-4 text-sm text-left mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Debug Information:</h4>
            <div className="space-y-1">
              <p><strong>User Email:</strong> {userEmail || 'Not found'}</p>
              <p><strong>API Check:</strong> {error ? 'Failed' : 'Completed'}</p>
              <p><strong>localStorage Key:</strong> hushhUserProfile</p>
              <p><strong>localStorage Data:</strong> {localStorage.getItem('hushhUserProfile') ? 'Available' : 'Empty'}</p>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={() => {
                  if (userEmail) {
                    checkUserInDatabase(userEmail);
                  } else {
                    alert('No email found. Please log in again.');
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                disabled={!userEmail}
              >
                Retry API Check
              </button>
              <button
                onClick={() => {
                  const data = localStorage.getItem('hushhUserProfile');
                  console.log('🔍 localStorage contents:', data);
                  console.log('🔍 All localStorage keys:', Object.keys(localStorage));
                  console.log('🔍 User email:', userEmail);
                  console.log('🔍 Current error:', error);
                  alert('Check console for debug information');
                }}
                className="px-3 py-1 bg-green-500 text-white rounded text-xs"
              >
                Debug Console
              </button>
              <button
                onClick={() => {
                  // Create test profile data
                  const testProfile = {
                    hushh_id: "test-123-456-789",
                    name: "Test User",
                    city: "Test City",
                    country: "test country",
                    email: userEmail || "test@example.com",
                    zipcode: "12345",
                    user_coins: 100,
                    dob: "1990-01-15",
                    phone_number: "+1234567890",
                    investor_type: "Individual Investor",
                    reason_for_using_hushhTech: "Testing the profile page",
                    accountCreation: new Date().toISOString(),
                    onboard_status: "authenticated"
                  };
                  localStorage.setItem('hushhUserProfile', JSON.stringify(testProfile));
                  window.location.reload();
                }}
                className="px-3 py-1 bg-purple-500 text-white rounded text-xs"
              >
                Create Test Data
              </button>
            </div>
          </div> */}
          
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

        {preferences && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">AI-inferred lifestyle preferences</h3>
              <p className="text-sm text-gray-500">
                Last enriched {formatDateTime(preferences.lastEnrichedAt)}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Food</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium text-gray-600">Diet:</span> {preferences.food.dietType}</li>
                  <li><span className="font-medium text-gray-600">Spice:</span> {preferences.food.spiceLevel}</li>
                  <li><span className="font-medium text-gray-600">Budget:</span> {preferences.food.budgetLevel}</li>
                  <li><span className="font-medium text-gray-600">Eats out:</span> {preferences.food.eatingOutFrequency}</li>
                  <li><span className="font-medium text-gray-600">Cuisines:</span> {formatList(preferences.food.favoriteCuisines)}</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Drink</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium text-gray-600">Alcohol:</span> {preferences.drink.alcoholPreference}</li>
                  <li><span className="font-medium text-gray-600">Alcohol types:</span> {formatList(preferences.drink.favoriteAlcoholTypes)}</li>
                  <li><span className="font-medium text-gray-600">Non-alcoholic:</span> {formatList(preferences.drink.favoriteNonAlcoholicTypes)}</li>
                  <li><span className="font-medium text-gray-600">Sugar:</span> {preferences.drink.sugarLevel}</li>
                  <li><span className="font-medium text-gray-600">Caffeine tolerance:</span> {preferences.drink.caffeineTolerance}</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Hotel</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium text-gray-600">Budget/night:</span> {formatBudget(preferences.hotel.budgetPerNight)}</li>
                  <li><span className="font-medium text-gray-600">Class:</span> {preferences.hotel.hotelClass}</li>
                  <li><span className="font-medium text-gray-600">Location:</span> {preferences.hotel.locationPreference}</li>
                  <li><span className="font-medium text-gray-600">Room:</span> {preferences.hotel.roomType}</li>
                  <li><span className="font-medium text-gray-600">Amenities:</span> {formatList(preferences.hotel.amenitiesPriority)}</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Coffee</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium text-gray-600">Consumer type:</span> {preferences.coffee.coffeeConsumerType}</li>
                  <li><span className="font-medium text-gray-600">Styles:</span> {formatList(preferences.coffee.coffeeStyle)}</li>
                  <li><span className="font-medium text-gray-600">Milk:</span> {preferences.coffee.milkPreference}</li>
                  <li><span className="font-medium text-gray-600">Sweetness:</span> {preferences.coffee.sweetnessLevel}</li>
                  <li><span className="font-medium text-gray-600">Ambience:</span> {preferences.coffee.cafeAmbiencePreference}</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Brands & shopping</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium text-gray-600">Style:</span> {preferences.brand.fashionStyle}</li>
                  <li><span className="font-medium text-gray-600">Tech ecosystem:</span> {preferences.brand.techEcosystem}</li>
                  <li><span className="font-medium text-gray-600">Shopping:</span> {formatList(preferences.brand.shoppingChannels)}</li>
                  <li><span className="font-medium text-gray-600">Price point:</span> {preferences.brand.priceSensitivity}</li>
                  <li><span className="font-medium text-gray-600">Values:</span> {formatList(preferences.brand.brandValues)}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

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
