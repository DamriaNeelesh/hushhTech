import resources from "../../resources/resources";
import checkRegistrationStatus from "./checkRegistrationStatus";

export default async function emailLogin(email: string, password: string) {
  const supabase = resources.config.supabaseClient;
  
  try {
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return "error";
    }

    // Attempt to sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return "error";
    }

    // Check if user's email is confirmed
    const { data: userData } = await supabase.auth.getUser();
    
    // If email is not confirmed, return error message
    if (userData?.user && !userData.user.email_confirmed_at) {
      return "email_not_verified";
    }
    
    // If everything is successful, log the user in
    localStorage.setItem("isLoggedIn", "true"); // Set login state
    
    // Check if user has completed profile registration
    try {
      const registrationStatus = await checkRegistrationStatus(email);
      
      if (!registrationStatus.isRegistered) {
        // User needs to complete registration
        window.location.href = "/user-registration";
        return data;
      }
    } catch (regError) {
      console.error("Error checking registration status:", regError);
      // If registration check fails, redirect to registration page to be safe
      window.location.href = "/user-registration";
      return data;
    }
    
    // User is fully registered, redirect to home
    window.location.href = "/";
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return "error";
  }
}
