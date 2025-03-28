import { 
  Handshake, 
  School, 
  Users, 
  Megaphone, 
  CreditCard, 
  TrendingUp,
  LucideIcon
} from "lucide-react";
import { constants } from "@/constants";

// Map icon names to their component
const iconMap: Record<string, LucideIcon> = {
  HandshakeIcon: Handshake,
  ChalkboardTeacher: School,
  Users,
  Megaphone,
  CreditCard,
  TrendingUp
};

export default function FeaturesSection() {
  const { features } = constants;
  
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
            Unlock the <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">Creator Economy</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our platform helps creators across all domains to connect, collaborate, 
            and monetize their skills and audience in multiple ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName];
            
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${feature.gradientClass}`}>
                  {IconComponent && <IconComponent className="text-white text-xl" />}
                </div>
                <h3 className="text-xl font-bold font-poppins mb-4">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
