import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import resources from "../../resources/resources";
import { firebaseAuth, googleProvider } from "../../resources/config/firebaseConfig";
import checkRegistrationStatus from "./checkRegistrationStatus";

export default async function googleSignIn() {
  try {
    if (!firebaseAuth || !googleProvider) {
      console.error("Firebase is not configured. Please provide VITE_FIREBASE_* env vars.");
      return;
    }

    const userCredential = await signInWithPopup(firebaseAuth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);

    const idToken =
      credential?.idToken ||
      (userCredential as any)?._tokenResponse?.oauthIdToken ||
      null;

    if (!idToken) {
      console.error("Google Sign-In did not return an ID token. Please ensure openid scope is enabled.");
      localStorage.setItem("isLoggedIn", "true");
      window.location.assign("/");
      return;
    }

    const supabase = resources.config.supabaseClient;

    if (supabase) {
      const { data: sessionData, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) {
        console.error("Failed to create Supabase session from Google token:", error);
      } else if (sessionData?.user && userCredential.user?.photoURL) {
        await supabase.auth.updateUser({
          data: {
            avatar_url: userCredential.user.photoURL,
          },
        });
      }
    }

    const userEmail = userCredential.user?.email;

    if (userEmail) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userEmail);

      const registrationStatus = await checkRegistrationStatus(userEmail);
      if (!registrationStatus.isRegistered) {
        window.location.href = "/user-registration";
        return;
      }
    }

    window.location.href = "/";
  } catch (error) {
    console.error("Firebase Google Sign-In failed:", error);
  }
}

