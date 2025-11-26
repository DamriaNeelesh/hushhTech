import { signOut as firebaseSignOut } from "firebase/auth";
import resources from "../../resources/resources";
import { firebaseAuth } from "../../resources/config/firebaseConfig";

export default async function signOut() {
  if (resources.config.supabaseClient) {
    await resources.config.supabaseClient.auth.signOut();
  }

  if (firebaseAuth) {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (error) {
      console.warn("Firebase sign-out failed:", error);
    }
  }
}
