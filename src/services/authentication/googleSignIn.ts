import resources from "../../resources/resources";

// Use Supabase OAuth flow for Google sign-in.
export default async function googleSignIn() {
  try {
    const supabase = resources.config.supabaseClient;
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return;
    }

    const redirectTo =
      resources.config.redirect_url || `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });

    if (error) {
      console.error("Supabase Google sign-in failed:", error);
      return;
    }

    if (data?.url) {
      window.location.assign(data.url);
    }
  } catch (error) {
    console.error("Supabase Google Sign-In failed:", error);
  }
}

