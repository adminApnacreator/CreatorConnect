import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturesSection from "@/components/features-section";
import CreatorProfiles from "@/components/creator-profiles";
import MonetizationSection from "@/components/monetization-section";
import TestimonialsSection from "@/components/testimonials-section";
import CtaSection from "@/components/cta-section";
import SocialLoginSection from "@/components/social-login-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Creator, Testimonial } from "@shared/schema";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: creators = [] } = useQuery<Creator[]>({
    queryKey: ['/api/creators'],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Close mobile menu when navigating to a section via anchor links
  useEffect(() => {
    const handleHashChange = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [mobileMenuOpen]);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CreatorProfiles creators={creators} />
      <MonetizationSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
      <SocialLoginSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
