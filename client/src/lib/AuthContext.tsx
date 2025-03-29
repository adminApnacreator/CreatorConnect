import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, AuthError } from "firebase/auth";
import { auth, checkRedirectResult } from "./firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: AuthError | null;
  providerData: any[] | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  error: null,
  providerData: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [providerData, setProviderData] = useState<any[] | null>(null);
  const { toast } = useToast();

  // Check for redirect result when the app loads
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Check if we have a redirect result
        const user = await checkRedirectResult();
        if (user) {
          setCurrentUser(user);
          setProviderData(user.providerData);
          
          // Show welcome toast for redirect login
          const provider = user.providerData[0]?.providerId || 'social account';
          const formattedProvider = provider.replace('.com', '').split('/').pop();
          
          toast({
            title: "Welcome!",
            description: `You've successfully signed in with ${formattedProvider}`,
          });
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
        setError(error as AuthError);
        
        // Don't show error toast for cancelled logins
        if ((error as AuthError).code !== 'auth/cancelled-popup-request' && 
            (error as AuthError).code !== 'auth/popup-closed-by-user') {
          toast({
            title: "Authentication Error",
            description: `${(error as AuthError).message || "Failed to sign in with social account"}`,
            variant: "destructive",
          });
        }
      }
    };

    handleRedirectResult();
  }, [toast]);

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setProviderData(user.providerData);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Auth state changed error:", error);
      setError(error as AuthError);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isLoading,
    error,
    providerData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}