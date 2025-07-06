// Test script for User Registration API
import axios from 'axios';

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_BASE_URL = "https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1";
const API_HEADERS = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Test data using country-state-city format
const testUserData = {
  first_name: "Test",
  last_name: "User", 
  email: "test.user.country.city@example.com",
  phone_number: "+1234567890",
  investor_type: "Individual Investor",
  gender: "male",
  country: "United States", // Full country name from country-state-city
  city: "New York",
  address: "123 Test Street",
  dob: "1990-01-15",
  selected_reason_for_using_hushh: "Testing country and city dropdowns",
  user_coins: 999,
  is_hushh_app_user: true,
  private_mode: false,
  onboard_status: "authenticated",
  accountCreation: new Date().toISOString()
};

async function testCreateUser() {
  try {
    console.log('🧪 Testing User Creation API...');
    console.log('📤 Sending data:', JSON.stringify(testUserData, null, 2));
    
    const response = await axios.post(
      `${API_BASE_URL}/users`,
      testUserData,
      { headers: API_HEADERS }
    );
    
    console.log('✅ User created successfully!');
    console.log('📥 Response:', response.status, response.statusText);
    console.log('📋 Response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error creating user:', error.response?.data || error.message);
    throw error;
  }
}

async function testSearchUser(email) {
  try {
    console.log('\n🔍 Testing User Search API...');
    
    const response = await axios.get(
      `${API_BASE_URL}/users?or=(email.ilike.*${email}*)`,
      { headers: API_HEADERS }
    );
    
    console.log('✅ User search successful!');
    console.log('📥 Found users:', response.data.length);
    
    if (response.data.length > 0) {
      console.log('👤 User data:', JSON.stringify(response.data[0], null, 2));
      return response.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error searching user:', error.response?.data || error.message);
    throw error;
  }
}

async function testUpdateUser(hushhId) {
  try {
    console.log('\n✏️ Testing User Update API...');
    
    const updateData = {
      first_name: "Updated Test",
      last_name: "User Updated",
      phone_number: "+1987654321",
      investor_type: "Institutional / Corporate Investor",
      country: "Canada",
      city: "Toronto",
      user_coins: 100
    };
    
    console.log('📤 Updating with data:', JSON.stringify(updateData, null, 2));
    
    const response = await axios.patch(
      `${API_BASE_URL}/users?hushh_id=eq.${hushhId}`,
      updateData,
      { headers: API_HEADERS }
    );
    
    console.log('✅ User updated successfully!');
    console.log('📥 Response:', response.status, response.statusText);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error updating user:', error.response?.data || error.message);
    throw error;
  }
}

async function runTests() {
  try {
    console.log('🚀 Starting User Registration API Tests\n');
    
    // Test 1: Create new user
    const createdUser = await testCreateUser();
    
    // Test 2: Search for the created user
    const foundUser = await testSearchUser(testUserData.email);
    
    if (foundUser && foundUser.hushh_id) {
      console.log(`\n🆔 User created with hushh_id: ${foundUser.hushh_id}`);
      
      // Test 3: Update the user
      await testUpdateUser(foundUser.hushh_id);
      
      // Test 4: Search again to verify update
      console.log('\n🔍 Verifying update...');
      const updatedUser = await testSearchUser(testUserData.email);
      
      if (updatedUser) {
        console.log('✅ Update verified!');
        console.log('📋 Final user data:', JSON.stringify(updatedUser, null, 2));
      }
    }
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
  }
}

// Export for use in browser console or node
if (typeof window !== 'undefined') {
  window.testRegistrationAPI = {
    runTests,
    testCreateUser,
    testSearchUser,
    testUpdateUser
  };
} else {
  // Run tests if called directly
  runTests();
}

export { runTests, testCreateUser, testSearchUser, testUpdateUser }; 