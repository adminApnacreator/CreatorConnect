import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { FaGoogle, FaFacebook } from "react-icons/fa";

interface LoginButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function LoginButton({ 
  variant = "default", 
  size = "default",
  className = ""
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You've successfully signed in with Google",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithFacebook();
      toast({
        title: "Success!",
        description: "You've successfully signed in with Facebook",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "There was a problem signing in with Facebook",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant={variant}
        size={size}
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={`flex items-center gap-2 ${className}`}
      >
        <FaGoogle className="h-4 w-4" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        variant="outline"
        size={size}
        onClick={handleFacebookLogin}
        disabled={isLoading}
        className={`flex items-center gap-2 ${className}`}
      >
        <FaFacebook className="h-4 w-4 text-blue-600" />
        <span>Sign in with Facebook</span>
      </Button>
    </div>
  );
}