import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithInstagram, 
  signInWithLinkedIn 
} from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { FaGoogle, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { emitAuthEvent, AUTH_SUCCESS_EVENT } from "@/lib/AuthContext";

interface LoginButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showAll?: boolean; // Whether to show all social login options or just Google/Facebook
}

export default function LoginButton({ 
  variant = "default", 
  size = "default",
  className = "",
  showAll = false
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    google: false,
    facebook: false,
    instagram: false,
    linkedin: false
  });
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading({ ...isLoading, google: true });
    try {
      const user = await signInWithGoogle();
      // If we got a user via popup, emit the auth success event
      if (user) {
        emitAuthEvent(AUTH_SUCCESS_EVENT, { user });
      }
      // For redirect auth on mobile, the page will refresh so this may not execute
      toast({
        title: "Success!",
        description: "You've successfully signed in with Google",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading({ ...isLoading, facebook: true });
    try {
      const user = await signInWithFacebook();
      // If we got a user via popup, emit the auth success event
      if (user) {
        emitAuthEvent(AUTH_SUCCESS_EVENT, { user });
      }
      // For redirect auth on mobile, the page will refresh so this may not execute
      toast({
        title: "Success!",
        description: "You've successfully signed in with Facebook",
      });
    } catch (error) {
      console.error("Facebook login error:", error);
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with Facebook",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, facebook: false });
    }
  };

  const handleInstagramLogin = async () => {
    setIsLoading({ ...isLoading, instagram: true });
    try {
      const user = await signInWithInstagram();
      // If we got a user via popup, emit the auth success event
      if (user) {
        emitAuthEvent(AUTH_SUCCESS_EVENT, { user });
      }
      // For redirect auth on mobile, the page will refresh so this may not execute
      toast({
        title: "Success!",
        description: "You've successfully signed in with Instagram",
      });
    } catch (error) {
      console.error("Instagram login error:", error);
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with Instagram",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, instagram: false });
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLoading({ ...isLoading, linkedin: true });
    try {
      const user = await signInWithLinkedIn();
      // If we got a user via popup, emit the auth success event
      if (user) {
        emitAuthEvent(AUTH_SUCCESS_EVENT, { user });
      }
      // For redirect auth on mobile, the page will refresh so this may not execute
      toast({
        title: "Success!",
        description: "You've successfully signed in with LinkedIn",
      });
    } catch (error) {
      console.error("LinkedIn login error:", error);
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with LinkedIn",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, linkedin: false });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        variant={variant}
        size={size}
        onClick={handleGoogleLogin}
        disabled={Object.values(isLoading).some(Boolean)}
        className={`flex items-center justify-center gap-3 hover:shadow-md transition-all ${className}`}
      >
        <FaGoogle className="h-5 w-5 text-[#4285F4]" />
        <span className="font-medium">{isLoading.google ? "Signing in..." : "Sign in with Google"}</span>
      </Button>
      
      <Button
        variant="outline"
        size={size}
        onClick={handleFacebookLogin}
        disabled={Object.values(isLoading).some(Boolean)}
        className={`flex items-center justify-center gap-3 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-md transition-all ${className}`}
      >
        <FaFacebook className="h-5 w-5" />
        <span className="font-medium">{isLoading.facebook ? "Signing in..." : "Sign in with Facebook"}</span>
      </Button>

      {showAll && (
        <>
          <Button
            variant="outline"
            size={size}
            onClick={handleInstagramLogin}
            disabled={Object.values(isLoading).some(Boolean)}
            className={`flex items-center justify-center gap-3 border-[#E1306C] text-[#E1306C] hover:bg-gradient-to-r hover:from-[#405DE6] hover:via-[#E1306C] hover:to-[#FFDC80] hover:text-white hover:shadow-md transition-all ${className}`}
          >
            <FaInstagram className="h-5 w-5" />
            <span className="font-medium">{isLoading.instagram ? "Signing in..." : "Sign in with Instagram"}</span>
          </Button>

          <Button
            variant="outline"
            size={size}
            onClick={handleLinkedInLogin}
            disabled={Object.values(isLoading).some(Boolean)}
            className={`flex items-center justify-center gap-3 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:shadow-md transition-all ${className}`}
          >
            <FaLinkedin className="h-5 w-5" />
            <span className="font-medium">{isLoading.linkedin ? "Signing in..." : "Sign in with LinkedIn"}</span>
          </Button>
        </>
      )}
    </div>
  );
}