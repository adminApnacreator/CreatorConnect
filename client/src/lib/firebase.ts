import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  OAuthProvider,
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";

// Import local config directly (this will be excluded in production builds)
import { firebaseLocalConfig } from './firebase.local';

// Use local config if available and env vars are missing or empty
const useLocalConfig = !import.meta.env.VITE_FIREBASE_API_KEY || 
                       import.meta.env.VITE_FIREBASE_API_KEY === "undefined" ||
                       import.meta.env.VITE_FIREBASE_API_KEY === "";

const firebaseConfig = useLocalConfig
  ? firebaseLocalConfig
  : {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

// For debugging - remove in production
console.log('Using Firebase config from:', useLocalConfig ? 'local file' : 'environment variables');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup providers
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Instagram auth is handled through Facebook in Firebase
// This is because Instagram is owned by Meta (Facebook)
const instagramProvider = new FacebookAuthProvider();
instagramProvider.addScope('email');
instagramProvider.addScope('public_profile');
instagramProvider.setCustomParameters({
  // This helps identify that the intent was to login with Instagram
  'display': 'popup',
  'auth_type': 'reauthenticate'
});

// LinkedIn provider using OAuthProvider
const linkedinProvider = new OAuthProvider('linkedin.com');
linkedinProvider.addScope('profile');
linkedinProvider.addScope('email');

// Check for redirect result on page load
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect sign-in successful");
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error getting redirect result", error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Use redirect for better mobile experience
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, googleProvider);
      return null; // Will redirect, so no user to return immediately
    } else {
      // Use popup for desktop
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Sign in with Facebook
export const signInWithFacebook = async () => {
  try {
    // Use redirect for better mobile experience
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, facebookProvider);
      return null; // Will redirect, so no user to return immediately
    } else {
      // Use popup for desktop
      const result = await signInWithPopup(auth, facebookProvider);
      return result.user;
    }
  } catch (error) {
    console.error("Error signing in with Facebook", error);
    throw error;
  }
};

// Sign in with Instagram (Note: This would require proper OAuth setup in Firebase)
export const signInWithInstagram = async () => {
  try {
    // Use redirect for better mobile experience
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, instagramProvider);
      return null; // Will redirect, so no user to return immediately
    } else {
      // Use popup for desktop
      const result = await signInWithPopup(auth, instagramProvider);
      return result.user;
    }
  } catch (error) {
    console.error("Error signing in with Instagram", error);
    throw error;
  }
};

// Sign in with LinkedIn (Note: This would require proper OAuth setup in Firebase)
export const signInWithLinkedIn = async () => {
  try {
    // Use redirect for better mobile experience
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, linkedinProvider);
      return null; // Will redirect, so no user to return immediately
    } else {
      // Use popup for desktop
      const result = await signInWithPopup(auth, linkedinProvider);
      return result.user;
    }
  } catch (error) {
    console.error("Error signing in with LinkedIn", error);
    throw error;
  }
};

// Sign out
export const signOut = () => auth.signOut();

export { auth };