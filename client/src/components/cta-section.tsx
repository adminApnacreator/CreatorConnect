import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                Ready to Monetize Your <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Influence?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of creators who are turning their passion into a sustainable income stream. 
                Get started for free and unlock the full potential of your creative career.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <p className="ml-3 text-gray-700">Connect with brands aligned to your niche</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <p className="ml-3 text-gray-700">Set up your service offerings with flexible pricing</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <p className="ml-3 text-gray-700">Collaborate with other creators in your space</p>
                </div>
              </div>
              
              <div className="mt-10">
                <Button className="px-8 py-6 rounded-full font-medium text-white bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] hover:opacity-90 shadow-lg">
                  Create Your Creator Profile
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Content creator" 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-2xl font-bold mb-2">Join 10,000+ creators</p>
                <p>From beginners to established influencers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-xl font-bold mb-6">Trusted by Creators on All Major Platforms</h3>
          <div className="flex flex-wrap justify-center gap-10 items-center">
            <div className="h-12 w-12 text-red-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <FaYoutube className="h-full w-full" />
            </div>
            <div className="h-10 w-10 text-pink-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <FaInstagram className="h-full w-full" />
            </div>
            <div className="h-10 w-10 text-blue-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <FaFacebook className="h-full w-full" />
            </div>
            <div className="h-10 w-10 text-blue-700 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <FaLinkedin className="h-full w-full" />
            </div>
            <div className="h-8 w-8 text-blue-400 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <FaTwitter className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
