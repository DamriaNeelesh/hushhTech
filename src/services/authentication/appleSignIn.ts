import resources from "../../resources/resources";

// Initiates Supabase OAuth flow for Apple sign-in.
export default async function appleSignIn() {
  try {
    const supabase = resources.config.supabaseClient;
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }

    const redirectTo =
      resources.config.redirect_url || `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("Supabase Apple sign-in failed:", error);
      return;
    }

    if (data?.url) {
      window.location.assign(data.url);
    }
  } catch (error) {
    console.error("Supabase Apple Sign-In failed:", error);
  }
}
