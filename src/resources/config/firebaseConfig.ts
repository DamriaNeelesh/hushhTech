import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlHXpuQQCwCQPqLm04R10sYjxMx_NC-jU",
  authDomain: "hushhtech.firebaseapp.com",
  projectId: "hushhtech",
  storageBucket: "hushhtech.firebasestorage.app",
  messagingSenderId: "781244418930",
  appId: "1:781244418930:web:2e35acbccdd76f22512beb",
};

const hasConfig = Object.values(firebaseConfig).some((value) => value);

const apps = getApps();

const firebaseApp = hasConfig
  ? apps.length > 0
    ? apps[0]
    : initializeApp(firebaseConfig)
  : undefined;

const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : undefined;

const googleProvider = firebaseApp ? new GoogleAuthProvider() : undefined;

if (googleProvider) {
  // Ensure we request an ID token so Supabase can verify it
  googleProvider.addScope("openid");
  googleProvider.addScope("email");
  googleProvider.addScope("profile");
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
} else {
  console.warn(
    "[Firebase] Missing configuration. Google sign-in will be unavailable until VITE_FIREBASE_* values are provided."
  );
}

export { firebaseApp, firebaseAuth, googleProvider };
