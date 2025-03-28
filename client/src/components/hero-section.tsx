import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              Monetize Your <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Creative</span> Influence
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Connect with brands, offer services, and unlock new revenue streams from your audience across all social platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-8 py-6 rounded-full font-medium text-white bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] hover:opacity-90 shadow-lg">
                Join as Creator
              </Button>
              <Button variant="outline" className="px-8 py-6 rounded-full font-medium">
                Find Creators
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-3">Trusted by creators from</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="h-8 w-8 text-red-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <FaYoutube className="h-full w-full" />
                </div>
                <div className="h-7 w-7 text-pink-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <FaInstagram className="h-full w-full" />
                </div>
                <div className="h-7 w-7 text-blue-600 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <FaFacebook className="h-full w-full" />
                </div>
                <div className="h-7 w-7 text-blue-700 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <FaLinkedin className="h-full w-full" />
                </div>
                <div className="h-6 w-6 text-blue-400 transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <FaTwitter className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] opacity-20 rounded-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Creators collaborating" 
              className="relative rounded-3xl shadow-2xl w-full object-cover h-96 md:h-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl w-48 md:w-64">
              <div className="text-sm font-medium text-gray-500">Monthly Revenue</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">₹125,000+</div>
              <div className="flex items-center text-green-500 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">24% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
