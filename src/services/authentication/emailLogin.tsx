import resources from "../../resources/resources";
export default async function emailLogin(email: string, password: string) {
  const supabase = resources.config.supabaseClient;
  
  try {
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
    window.location.href = resources.config.redirect_url;
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return "error";
  }
}
