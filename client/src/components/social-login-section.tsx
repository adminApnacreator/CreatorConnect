import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";
import { useToast } from "@/hooks/use-toast";
import { 
  FaGoogle, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaMicrosoft,
  FaApple,
  FaUserCircle
} from "react-icons/fa";

export default function SocialLoginSection() {
  const { currentUser, providerData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  // Helper function to get provider icon
  const getProviderIcon = (providerId: string) => {
    if (providerId.includes('google')) return <FaGoogle className="w-5 h-5 text-[#4285F4]" />;
    if (providerId.includes('facebook')) return <FaFacebook className="w-5 h-5 text-[#1877F2]" />;
    if (providerId.includes('instagram')) return <FaInstagram className="w-5 h-5 text-[#E1306C]" />;
    if (providerId.includes('linkedin')) return <FaLinkedin className="w-5 h-5 text-[#0077B5]" />;
    if (providerId.includes('twitter')) return <FaTwitter className="w-5 h-5 text-[#1DA1F2]" />;
    if (providerId.includes('github')) return <FaGithub className="w-5 h-5 text-[#333]" />;
    if (providerId.includes('microsoft')) return <FaMicrosoft className="w-5 h-5 text-[#00A4EF]" />;
    if (providerId.includes('apple')) return <FaApple className="w-5 h-5 text-[#A2AAAD]" />;
    return <FaUserCircle className="w-5 h-5 text-gray-500" />;
  };
  
  // Helper function to get formatted provider name
  const getProviderName = (providerId: string): string => {
    if (providerId.includes('google')) return 'Google';
    if (providerId.includes('facebook')) return 'Facebook';
    if (providerId.includes('instagram')) return 'Instagram';
    if (providerId.includes('linkedin')) return 'LinkedIn';
    if (providerId.includes('twitter')) return 'Twitter';
    if (providerId.includes('github')) return 'GitHub';
    if (providerId.includes('microsoft')) return 'Microsoft';
    if (providerId.includes('apple')) return 'Apple';
    return providerId.split('.')[0] || 'Unknown Provider';
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log({ email, password });
    // Clear form
    setEmail("");
    setPassword("");
    
    // Show a toast since this is just a mock implementation
    toast({
      title: "Email Login Coming Soon",
      description: "Email/password authentication is not yet implemented.",
      variant: "default"
    });
  };
  
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            Quick <span className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-transparent bg-clip-text">Authentication</span>
          </h2>
          <p className="text-lg text-gray-600">
            Connect your social accounts to get started instantly and help brands verify your audience.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {currentUser ? (
              <div className="space-y-6 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src={currentUser.photoURL || "https://via.placeholder.com/100"} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    
                    {/* Provider badge */}
                    {providerData && providerData.length > 0 && (
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                        {getProviderIcon(providerData[0]?.providerId || '')}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-lg">{currentUser.displayName || "User"}</h3>
                  <p className="text-gray-500 text-sm">{currentUser.email}</p>
                  
                  {/* Provider info */}
                  {providerData && providerData.length > 0 && (
                    <div className="mt-1 text-xs text-gray-600 flex items-center justify-center gap-1">
                      <span>
                        Signed in with {getProviderName(providerData[0]?.providerId || '')}
                      </span>
                    </div>
                  )}
                  
                  {/* Show verification info */}
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-4 h-4 text-green-500"
                    >
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {currentUser.emailVerified ? "Email verified" : "Email not verified"}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-green-600 font-medium mb-4">
                    You're successfully signed in!
                  </p>
                  <LogoutButton className="w-full" showProviderName={true} />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {/* Use the enhanced LoginButton with all social login options */}
                  <LoginButton showAll={true} />
                </div>
                
                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span className="mx-4 text-gray-500 text-sm">or</span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-lg"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <Input 
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-3 rounded-lg"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full py-6 rounded-lg bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:opacity-90 transition"
                    >
                      Sign Up with Email
                    </Button>
                  </div>
                </form>
              </>
            )}
            
            <p className="text-center text-sm text-gray-500 mt-6">
              By signing up, you agree to our <a href="#" className="text-[#0072FF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0072FF] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
