import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: { name: string; email: string; subject: string; message: string }) => {
      const response = await apiRequest("POST", "/api/contact", formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, subject, message });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Have Questions? <span className="bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] text-transparent bg-clip-text">Let's Connect</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is ready to help you navigate the creator economy and find the best way to monetize your influence.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
                  <Mail className="text-white h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-600 mt-1">support@apnacreator.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center">
                  <Phone className="text-white h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Visit Us</p>
                  <p className="text-gray-600 mt-1">91 Springboard, Koramangala<br />Bengaluru, Karnataka 560034</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="mb-4 font-medium">Connect with us on social media</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] flex items-center justify-center text-white hover:opacity-90 transition">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF] flex items-center justify-center text-white hover:opacity-90 transition">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] flex items-center justify-center text-white hover:opacity-90 transition">
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:opacity-90 transition">
                  <FaYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg" 
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      type="email" 
                      id="contact-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg" 
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input 
                      type="text" 
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg" 
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea 
                      id="message" 
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg" 
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full py-6 rounded-lg bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] hover:opacity-90 transition"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
