import { Link } from "wouter";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold font-poppins mb-6">
              <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Apna</span>
              <span className="bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] text-transparent bg-clip-text">Creator</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering creators to monetize their influence across all social platforms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#creators" className="text-gray-400 hover:text-white transition">Creators</a></li>
              <li><a href="#monetize" className="text-gray-400 hover:text-white transition">Monetization</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Creator Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Creator Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Brand Partnership Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} ApnaCreator. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
