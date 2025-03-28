import {
  type Creator,
  type InsertCreator,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";

export interface IStorage {
  // Creator methods
  getAllCreators(): Promise<Creator[]>;
  getCreator(id: number): Promise<Creator | undefined>;
  getCreatorByUsername(username: string): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;

  // Service methods
  getServices(creatorId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private creators: Map<number, Creator>;
  private services: Map<number, Service>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private creatorCurrentId: number;
  private serviceCurrentId: number;
  private testimonialCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.creators = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.creatorCurrentId = 1;
    this.serviceCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.contactMessageCurrentId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  // Creator methods
  async getAllCreators(): Promise<Creator[]> {
    return Array.from(this.creators.values());
  }

  async getCreator(id: number): Promise<Creator | undefined> {
    return this.creators.get(id);
  }

  async getCreatorByUsername(username: string): Promise<Creator | undefined> {
    return Array.from(this.creators.values()).find(
      (creator) => creator.username === username
    );
  }

  async createCreator(insertCreator: InsertCreator): Promise<Creator> {
    const id = this.creatorCurrentId++;
    const creator: Creator = { ...insertCreator, id };
    this.creators.set(id, creator);
    return creator;
  }

  // Service methods
  async getServices(creatorId: number): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.creatorId === creatorId
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact message methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt: new Date()
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  // Initialize sample data
  private initSampleData() {
    // Sample creators
    const creators: InsertCreator[] = [
      {
        name: "Priya Sharma",
        username: "priyasharma",
        email: "priya@example.com",
        password: "password123",
        bio: "Wellness & Lifestyle expert helping you live your best life",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        platform: "instagram",
        followers: 145000,
        verified: true,
      },
      {
        name: "Rahul Mehta",
        username: "rahulmehta",
        email: "rahul@example.com",
        password: "password123",
        bio: "Tech & Business advisor helping professionals grow their careers",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        platform: "linkedin",
        followers: 78000,
        verified: true,
      },
      {
        name: "Arjun Dev",
        username: "arjundev",
        email: "arjun@example.com",
        password: "password123",
        bio: "Travel & Photography enthusiast showing you the world",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        platform: "youtube",
        followers: 450000,
        verified: true,
      },
      {
        name: "Anjali Kapoor",
        username: "anjalikapoor",
        email: "anjali@example.com",
        password: "password123",
        bio: "Fashion and beauty creator helping you look and feel your best",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
        platform: "instagram",
        followers: 89000,
        verified: true,
      },
      {
        name: "Vikram Singh",
        username: "vikramsingh",
        email: "vikram@example.com",
        password: "password123",
        bio: "Fitness coach providing workout and nutrition guidance",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
        platform: "youtube",
        followers: 320000,
        verified: true,
      },
      {
        name: "Neha Gupta",
        username: "nehagupta",
        email: "neha@example.com",
        password: "password123",
        bio: "Lifestyle creator sharing daily inspiration and tips",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
        platform: "instagram",
        followers: 45000,
        verified: true,
      }
    ];

    // Create sample creators
    creators.forEach(creator => {
      const id = this.creatorCurrentId++;
      this.creators.set(id, { ...creator, id });
    });

    // Add services for each creator
    const services: InsertService[] = [
      {
        creatorId: 1,
        title: "Sponsored Post",
        description: "Product feature with review",
        price: 25000,
      },
      {
        creatorId: 1,
        title: "1:1 Wellness Coaching",
        description: "60-minute personalized session",
        price: 3500,
      },
      {
        creatorId: 2,
        title: "Career Consultation",
        description: "Resume review & career strategy",
        price: 7500,
      },
      {
        creatorId: 2,
        title: "Tech Webinar",
        description: "Sponsored tech talk for your team",
        price: 35000,
      },
      {
        creatorId: 3,
        title: "Destination Feature",
        description: "Dedicated travel vlog",
        price: 50000,
      },
      {
        creatorId: 3,
        title: "Photography Masterclass",
        description: "2-hour group workshop",
        price: 2000,
      },
      {
        creatorId: 4,
        title: "Fashion Collaboration",
        description: "Styling and outfit review",
        price: 30000,
      },
      {
        creatorId: 5,
        title: "Fitness Program",
        description: "Custom 4-week workout plan",
        price: 5000,
      },
      {
        creatorId: 6,
        title: "Lifestyle Promotion",
        description: "Product integration in daily content",
        price: 15000,
      }
    ];

    // Create sample services
    services.forEach(service => {
      const id = this.serviceCurrentId++;
      this.services.set(id, { ...service, id });
    });

    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Vikram Rajput",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        platform: "youtube",
        followers: 320000,
        content: "ApnaCreator completely transformed how I monetize my tech tutorials. I've collaborated with 3 major tech brands and increased my monthly revenue by 240% in just 6 months!",
        rating: 5,
      },
      {
        name: "Neha Gupta",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        platform: "instagram",
        followers: 45000,
        content: "As a micro-influencer, I was struggling to get brand deals. With ApnaCreator, I've been able to set up my coaching services and connect with brands that perfectly align with my values.",
        rating: 5,
      },
      {
        name: "Karan Singhania",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        platform: "linkedin",
        followers: 65000,
        content: "The platform made it easy to offer business consultations and connect with other LinkedIn creators. I've built a community that's both profitable and genuinely helpful to my audience.",
        rating: 5,
      }
    ];

    // Create sample testimonials
    testimonials.forEach(testimonial => {
      const id = this.testimonialCurrentId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }
}

export const storage = new MemStorage();
