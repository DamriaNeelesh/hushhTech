import React from 'react';
import axios from 'axios';
import { Country, City } from 'country-state-city';

const API_ENDPOINT = "https://hushh-api-53407187172.us-central1.run.app/api/hushhtech-wrapper";
const API_HEADERS = {
  'Content-Type': 'application/json'
};

const APITestButton: React.FC = () => {
  
  const testCountryCityAPI = async () => {
    try {
      console.log('🧪 Testing Country-State-City Library and API...');
      
      // Test 1: Get all countries
      const countries = Country.getAllCountries();
      console.log('🌍 Available countries:', countries.length);
      console.log('🇺🇸 Sample country (US):', countries.find(c => c.isoCode === 'US'));
      
      // Test 2: Get cities for US
      const usCities = City.getCitiesOfCountry('US');
      console.log('🏙️ US Cities available:', usCities?.length || 0);
      if (usCities && usCities.length > 0) {
        console.log('🗽 Sample US cities:', usCities.slice(0, 5).map(c => c.name));
      }
      
      // Test 3: Create test user with real country/city data matching new API format
      const testUserData = {
        first_name: "API Test",
        last_name: "User",
        email: `test.country.city.${Date.now()}@example.com`,
        phone_number: "+1234567890",
        gender: "male",
        country: "india", // lowercase country name
        city: "Pune",
        dob: "1990-01-15",
        reason_for_using: "Testing API integration",
        investor_type: "Individual Investor"
      };
      
      console.log('📤 Creating test user:', testUserData);
      
      // Test 4: API Create User using new endpoint
      const createResponse = await axios.post(
        API_ENDPOINT,
        testUserData,
        { headers: API_HEADERS }
      );
      
      console.log('✅ User created successfully!', createResponse.status);
      console.log('📥 Response data:', createResponse.data);
      
      // Extract and store user profile data from response
      if (createResponse.data && createResponse.data.user) {
        const userProfile = {
          hushh_id: createResponse.data.user.hushh_id,
          name: createResponse.data.user.name || `${createResponse.data.user.first_name} ${createResponse.data.user.last_name}`,
          city: createResponse.data.user.city,
          country: createResponse.data.user.country,
          email: createResponse.data.user.email,
          zipcode: createResponse.data.user.zipcode,
          user_coins: createResponse.data.user.user_coins,
          dob: createResponse.data.user.dob,
          phone_number: createResponse.data.user.phone_number,
          investor_type: createResponse.data.user.investor_type,
          reason_for_using_hushhTech: createResponse.data.user.reason_for_using_hushhTech,
          accountCreation: createResponse.data.user.accountCreation,
          onboard_status: createResponse.data.user.onboard_status
        };
        
        // Store user profile data in localStorage
        localStorage.setItem('hushhUserProfile', JSON.stringify(userProfile));
        
        console.log('💾 Test user profile stored:', userProfile);
      }
      
      console.log('🎉 All API tests passed!');
      alert('✅ API Test Successful! Check console for details. Profile data has been stored and you can view it at /your-profile');
      
    } catch (error: any) {
      console.error('❌ API Test failed:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`❌ API Test failed! Status: ${error.response.status}\nError: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        alert('❌ API Test failed! Network error - check your connection.');
      } else {
        alert('❌ API Test failed! Check console for errors.');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={testCountryCityAPI}
      className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
    >
      🧪 Test New API
    </button>
  );
};

export default APITestButton; 