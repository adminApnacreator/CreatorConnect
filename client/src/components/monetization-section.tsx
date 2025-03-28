import { Check, Megaphone as MegaphoneIcon } from "lucide-react";

// Custom icon components
const ExchangeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="18" y1="4" x2="6" y2="16"></line>
    <polyline points="8 4 18 4 18 14"></polyline>
    <line x1="6" y1="20" x2="18" y2="8"></line>
    <polyline points="16 20 6 20 6 10"></polyline>
  </svg>
);

const LaptopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="20" x2="22" y2="20"></line>
  </svg>
);

export default function MonetizationSection() {
  return (
    <section id="monetize" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            Multiple Ways to <span className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-transparent bg-clip-text">Monetize</span> Your Influence
          </h2>
          <p className="text-lg text-gray-600">
            Turn your audience into a sustainable income with our versatile monetization options
            tailored for creators at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Brand collaboration" 
              className="w-full h-64 object-cover" 
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold font-poppins mb-4">Brand Partnerships</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Sponsored Content</p>
                    <p className="text-gray-600 mt-1">Create authentic content featuring products or services aligned with your audience interests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Ambassador Programs</p>
                    <p className="text-gray-600 mt-1">Build long-term relationships with brands for consistent income streams.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Affiliate Marketing</p>
                    <p className="text-gray-600 mt-1">Earn commissions by promoting products with your unique tracking links.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Professional services" 
              className="w-full h-64 object-cover" 
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold font-poppins mb-4">Professional Services</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Coaching & Consultations</p>
                    <p className="text-gray-600 mt-1">Offer your expertise through one-on-one sessions in your area of specialization.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Workshops & Webinars</p>
                    <p className="text-gray-600 mt-1">Host paid group sessions to teach skills and share knowledge with your audience.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center">
                    <Check className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Custom Content Creation</p>
                    <p className="text-gray-600 mt-1">Create bespoke content for businesses looking to reach your audience demographic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center mb-4">
                <MegaphoneIcon className="text-white h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold mb-3">Creator Promotions</h4>
              <p className="text-gray-600">
                Offer shoutouts and promotions to smaller creators looking to grow their audience.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center mb-4">
                <ExchangeIcon className="text-white h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold mb-3">Barter Collaborations</h4>
              <p className="text-gray-600">
                Exchange services with other creators to mutually benefit without financial transactions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center mb-4">
                <LaptopIcon className="text-white h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold mb-3">Digital Products</h4>
              <p className="text-gray-600">
                Sell templates, presets, guides, or other digital products to your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
