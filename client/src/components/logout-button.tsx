import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/lib/AuthContext";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showProviderName?: boolean; // Whether to show the provider name in the button text
}

export default function LogoutButton({
  variant = "ghost",
  size = "default",
  className = "",
  showProviderName = false
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser, providerData } = useAuth();

  // Get provider name for display
  const getProviderName = (): string => {
    if (!currentUser || !providerData || providerData.length === 0) return "Account";
    
    const provider = providerData[0]?.providerId || '';
    
    // Format the provider name
    if (provider.includes('google')) return 'Google';
    if (provider.includes('facebook')) return 'Facebook';
    if (provider.includes('linkedin')) return 'LinkedIn';
    if (provider.includes('instagram')) return 'Instagram';
    if (provider.includes('twitter')) return 'Twitter';
    if (provider.includes('github')) return 'GitHub';
    if (provider.includes('microsoft')) return 'Microsoft';
    if (provider.includes('apple')) return 'Apple';
    
    return "Account";
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center gap-2 ${className}`}
    >
      <FiLogOut className="h-4 w-4" />
      <span>
        {isLoading 
          ? "Logging out..." 
          : showProviderName 
            ? `Logout from ${getProviderName()}` 
            : "Logout"
        }
      </span>
    </Button>
  );
}