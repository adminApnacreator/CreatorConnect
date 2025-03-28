import { Button } from "@/components/ui/button";
import { BadgeCheck, Instagram, Linkedin, Youtube } from "lucide-react";
import { Creator } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";

interface CreatorProfileProps {
  creators: Creator[];
}

export default function CreatorProfiles({ creators }: CreatorProfileProps) {
  // Get first 3 creators for the showcase
  const showcaseCreators = creators.slice(0, 3);

  return (
    <section id="creators" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            Popular <span className="bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] text-transparent bg-clip-text">Creators</span> on our Platform
          </h2>
          <p className="text-lg text-gray-600">
            From tech experts to lifestyle influencers, discover creators offering diverse services
            and collaborations across multiple platforms.
          </p>
        </div>

        {showcaseCreators.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading creator profiles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8 py-3 rounded-full font-medium">
            Explore All Creators
          </Button>
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  // Fetch creator services
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: [`/api/creators/${creator.id}/services`],
  });

  // Find platform icon
  let PlatformIcon = Instagram;
  let platformColor = "text-pink-500";
  let platformGradient = "bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121]";
  
  if (creator.platform === "youtube") {
    PlatformIcon = Youtube;
    platformColor = "text-red-600";
    platformGradient = "bg-gradient-to-r from-[#00C6FF] to-[#0072FF]";
  } else if (creator.platform === "linkedin") {
    PlatformIcon = Linkedin;
    platformColor = "text-blue-600";
    platformGradient = "bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B]";
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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={`h-40 ${platformGradient} relative`}>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-sm font-medium flex items-center">
          <PlatformIcon className={`${platformColor} mr-2 h-4 w-4`} />
          <span>{formatFollowers(creator.followers)} followers</span>
        </div>
      </div>
      <div className="relative px-6 pb-6">
        <div className="flex justify-between">
          <div className="flex items-end -mt-10 mb-4">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md" 
            />
            <div className="ml-3 pt-2">
              <h3 className="text-lg font-bold">{creator.name}</h3>
              <p className="text-gray-500">{creator.bio?.split(' ').slice(0, 3).join(' ')}</p>
            </div>
          </div>
          {creator.verified && (
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                <BadgeCheck className="h-3 w-3 mr-1" />
                Verified
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-3">
          {services.slice(0, 2).map((service) => (
            <div key={service.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
              <div>
                <p className="text-sm font-medium">{service.title}</p>
                <p className="text-xs text-gray-500">{service.description}</p>
              </div>
              <p className="text-lg font-bold text-[#0072FF]">₹{service.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button className="w-full py-6 rounded-lg bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-white font-medium">
            Connect with {creator.name.split(' ')[0]}
          </Button>
        </div>
      </div>
    </div>
  );
}
