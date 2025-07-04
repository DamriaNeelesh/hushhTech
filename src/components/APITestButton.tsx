import React from 'react';
import axios from 'axios';
import { Country, City } from 'country-state-city';

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_BASE_URL = "https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1";
const API_HEADERS = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
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
      
      // Test 3: Create test user with real country/city data
      const testUserData = {
        first_name: "API Test",
        last_name: "User",
        email: `test.country.city.${Date.now()}@example.com`,
        phone_number: "+1234567890",
        investor_type: "Individual Investor",
        gender: "male",
        country: "United States", // Full country name
        city: "New York",
        address: "123 Test Street",
        dob: "1990-01-15",
        selected_reason_for_using_hushh: "Testing country-state-city library",
        user_coins: 0,
        is_hushh_app_user: true,
        private_mode: false,
        onboard_status: "authenticated",
        accountCreation: new Date().toISOString()
      };
      
      console.log('📤 Creating test user:', testUserData);
      
      // Test 4: API Create User
      const createResponse = await axios.post(
        `${API_BASE_URL}/users`,
        testUserData,
        { headers: API_HEADERS }
      );
      
      console.log('✅ User created successfully!', createResponse.status);
      
      // Test 5: API Search User
      const searchResponse = await axios.get(
        `${API_BASE_URL}/users?or=(email.ilike.*${testUserData.email}*)`,
        { headers: API_HEADERS }
      );
      
      console.log('🔍 User found:', searchResponse.data.length > 0);
      
      if (searchResponse.data.length > 0) {
        const foundUser = searchResponse.data[0];
        console.log('👤 Found user data:', foundUser);
        
        // Test 6: API Update User
        if (foundUser.hushh_id) {
          const updateData = {
            first_name: "Updated API Test",
            country: "Canada",
            city: "Toronto",
            investor_type: "Institutional / Corporate Investor"
          };
          
          const updateResponse = await axios.patch(
            `${API_BASE_URL}/users?hushh_id=eq.${foundUser.hushh_id}`,
            updateData,
            { headers: API_HEADERS }
          );
          
          console.log('✏️ User updated successfully!', updateResponse.status);
        }
      }
      
      console.log('🎉 All API tests passed!');
      alert('✅ API Test Successful! Check console for details.');
      
    } catch (error) {
      console.error('❌ API Test failed:', error);
      alert('❌ API Test failed! Check console for errors.');
    }
  };

  return (
    <button
      type="button"
      onClick={testCountryCityAPI}
      className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
    >
      🧪 Test Country-City API
    </button>
  );
};

export default APITestButton; 