import { Star, Youtube, Instagram, Linkedin } from "lucide-react";
import { Testimonial } from "@shared/schema";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            What Our <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Creators</span> Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from creators who have transformed their passion into profit through our platform.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-40 -top-20 w-80 h-80 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -right-40 -bottom-20 w-80 h-80 bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] rounded-full filter blur-3xl opacity-10"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length === 0 ? (
              <div className="col-span-3 flex justify-center items-center h-64">
                <p className="text-gray-500">Loading testimonials...</p>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Find platform icon
  let PlatformIcon = Instagram;
  let platformColor = "text-pink-500";
  
  if (testimonial.platform === "youtube") {
    PlatformIcon = Youtube;
    platformColor = "text-red-600";
  } else if (testimonial.platform === "linkedin") {
    PlatformIcon = Linkedin;
    platformColor = "text-blue-600";
  }

  // Format followers
  const formatFollowers = (count: number | undefined) => {
    if (!count) return "0";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 relative z-10">
      <div className="flex items-center mb-6">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover" 
        />
        <div className="ml-4">
          <h4 className="font-bold">{testimonial.name}</h4>
          <div className="flex text-yellow-400 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">
        "{testimonial.content}"
      </p>
      <div className="mt-4 flex items-center">
        <PlatformIcon className={`${platformColor} mr-2 h-4 w-4`} />
        <span className="text-sm text-gray-500">
          {testimonial.platform.charAt(0).toUpperCase() + testimonial.platform.slice(1)} creator, {formatFollowers(testimonial.followers)} followers
        </span>
      </div>
    </div>
  );
}
