import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold font-poppins">
              <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Apna</span>
              <span className="bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] text-transparent bg-clip-text">Creator</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="font-medium text-gray-700 hover:text-primary-500">Features</a>
            <a href="#creators" className="font-medium text-gray-700 hover:text-primary-500">Creators</a>
            <a href="#monetize" className="font-medium text-gray-700 hover:text-primary-500">Monetize</a>
            <a href="#testimonials" className="font-medium text-gray-700 hover:text-primary-500">Testimonials</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-primary-500">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full font-medium text-primary-500 border border-primary-500 hover:bg-primary-100 transition">
              Log In
            </button>
            <button className="px-4 py-2 rounded-full font-medium text-white bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:opacity-90 transition">
              Sign Up
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
          <div className="pt-2 pb-4 space-y-1">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Features</a>
            <a href="#creators" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Creators</a>
            <a href="#monetize" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Monetize</a>
            <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contact</a>
            <div className="flex space-x-3 px-3 pt-4">
              <button className="flex-1 px-4 py-2 rounded-full font-medium text-primary-500 border border-primary-500 hover:bg-primary-100 transition">
                Log In
              </button>
              <button className="flex-1 px-4 py-2 rounded-full font-medium text-white bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:opacity-90 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
