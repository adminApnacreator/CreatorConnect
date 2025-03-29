import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Add custom OAuth providers for Instagram and LinkedIn
const createCustomProvider = (providerId: string) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    // This tells Firebase Auth to specifically handle this as a custom provider
    // In a real implementation, you would need to set up Firebase Auth custom domains
    'login_hint': providerId 
  });
  return provider;
};

const instagramProvider = createCustomProvider('instagram.com');
const linkedinProvider = createCustomProvider('linkedin.com');

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