import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { FiLogOut } from "react-icons/fi";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function LogoutButton({
  variant = "ghost",
  size = "default",
  className = ""
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error) {
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
      <span>Logout</span>
    </Button>
  );
}