import axios from "axios";

// API configuration - Using the same API configuration as UserRegistration
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0";
const API_BASE_URL = "https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1";
const API_HEADERS = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

export interface RegistrationStatus {
  isRegistered: boolean;
  hasHushhId: boolean;
  userData?: any;
}

/**
 * Check if a user has completed their profile registration
 * @param email - User's email to check registration status
 * @returns RegistrationStatus object indicating registration state
 */
export default async function checkRegistrationStatus(email: string): Promise<RegistrationStatus> {
  try {
    // Search for user by email using the search API
    const response = await axios.get(
      `${API_BASE_URL}/users?or=(email.ilike.*${email}*)`,
      { headers: API_HEADERS }
    );
    
    if (response.data && response.data.length > 0) {
      const userData = response.data[0];
      
      // User exists in database
      // Check if user has hushh_id (indicating complete registration)
      const hasHushhId = !!(userData.hushh_id && userData.hushh_id.trim() !== '');
      
      return {
        isRegistered: hasHushhId,
        hasHushhId: hasHushhId,
        userData: userData
      };
    } else {
      // User doesn't exist in database at all
      return {
        isRegistered: false,
        hasHushhId: false,
        userData: null
      };
    }
  } catch (error) {
    console.error("Error checking registration status:", error);
    // In case of API error, assume user needs to register to be safe
    return {
      isRegistered: false,
      hasHushhId: false,
      userData: null
    };
  }
} 