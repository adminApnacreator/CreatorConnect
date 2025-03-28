import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export default function SocialLoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log({ email, password });
    // Clear form
    setEmail("");
    setPassword("");
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
            <div className="space-y-4">
              <button className="w-full py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center space-x-3 hover:bg-gray-50 transition">
                <FaGoogle className="text-red-500 text-xl" />
                <span className="font-medium">Continue with Google</span>
              </button>
              <button className="w-full py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center space-x-3 hover:bg-gray-50 transition">
                <FaFacebook className="text-blue-600 text-xl" />
                <span className="font-medium">Continue with Facebook</span>
              </button>
              <button className="w-full py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center space-x-3 hover:bg-gray-50 transition">
                <FaInstagram className="text-pink-500 text-xl" />
                <span className="font-medium">Continue with Instagram</span>
              </button>
              <button className="w-full py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center space-x-3 hover:bg-gray-50 transition">
                <FaLinkedin className="text-blue-600 text-xl" />
                <span className="font-medium">Continue with LinkedIn</span>
              </button>
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
            
            <p className="text-center text-sm text-gray-500 mt-6">
              By signing up, you agree to our <a href="#" className="text-[#0072FF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0072FF] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
