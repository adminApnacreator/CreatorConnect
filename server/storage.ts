import {
  type Creator,
  type InsertCreator,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial,
  type ContactMessage,
  type InsertContactMessage,
  type Conversation,
  type InsertConversation,
  type Message,
  type InsertMessage,
} from "@shared/schema.js";

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
  
  // Conversation methods
  getConversationsByCreator(creatorId: number): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  getOrCreateConversation(creator1Id: number, creator2Id: number): Promise<Conversation>;
  updateConversationLastActive(conversationId: number): Promise<Conversation | undefined>;
  
  // Message methods
  getMessagesByConversation(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessagesAsRead(conversationId: number, recipientId: number): Promise<void>;
  getUnreadMessageCount(creatorId: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private creators: Map<number, Creator>;
  private services: Map<number, Service>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private creatorCurrentId: number;
  private serviceCurrentId: number;
  private testimonialCurrentId: number;
  private contactMessageCurrentId: number;
  private conversationCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.creators = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.creatorCurrentId = 1;
    this.serviceCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.conversationCurrentId = 1;
    this.messageCurrentId = 1;

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
    const creator: Creator = {
      ...insertCreator,
      id,
      bio: insertCreator.bio ?? null,
      avatar: insertCreator.avatar ?? null,
      otherPlatforms: insertCreator.otherPlatforms ?? null,
      followers: insertCreator.followers ?? null,
      engagementRate: insertCreator.engagementRate ?? null,
      location: insertCreator.location ?? null,
      languages: insertCreator.languages ?? null,
      contentCategories: insertCreator.contentCategories ?? null,
      verified: insertCreator.verified ?? null
    };
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
    const service: Service = {
      ...insertService,
      id,
      revisions: insertService.revisions ?? null
    };
    this.services.set(id, service);
    return service;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      avatar: insertTestimonial.avatar ?? null,
      followers: insertTestimonial.followers ?? null
    };
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

  // Conversation methods
  async getConversationsByCreator(creatorId: number): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).filter(
      conversation => conversation.creator1Id === creatorId || conversation.creator2Id === creatorId
    ).sort((a, b) => {
      // Sort conversations by most recent message
      const bTime = b.lastMessageAt?.getTime() ?? 0;
      const aTime = a.lastMessageAt?.getTime() ?? 0;
      return bTime - aTime;
    });
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getOrCreateConversation(creator1Id: number, creator2Id: number): Promise<Conversation> {
    // Check if conversation already exists between these two creators
    const existingConversation = Array.from(this.conversations.values()).find(
      conversation => 
        (conversation.creator1Id === creator1Id && conversation.creator2Id === creator2Id) ||
        (conversation.creator1Id === creator2Id && conversation.creator2Id === creator1Id)
    );

    if (existingConversation) {
      return existingConversation;
    }

    // Create a new conversation if one doesn't exist
    const id = this.conversationCurrentId++;
    const now = new Date();
    const conversation: Conversation = {
      id,
      creator1Id,
      creator2Id,
      lastMessageAt: now,
      createdAt: now
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversationLastActive(conversationId: number): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return undefined;

    const updatedConversation = {
      ...conversation,
      lastMessageAt: new Date()
    };
    this.conversations.set(conversationId, updatedConversation);
    return updatedConversation;
  }

  // Message methods
  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => {
        const aTime = a.createdAt?.getTime() ?? 0;
        const bTime = b.createdAt?.getTime() ?? 0;
        return aTime - bTime;
      });
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const message: Message = {
      ...insertMessage,
      id,
      read: false,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    
    // Update the conversation's last active timestamp
    await this.updateConversationLastActive(insertMessage.conversationId);
    
    return message;
  }

  async markMessagesAsRead(conversationId: number, recipientId: number): Promise<void> {
    Array.from(this.messages.values())
      .filter(message => 
        message.conversationId === conversationId && 
        message.receiverId === recipientId &&
        !message.read
      )
      .forEach(message => {
        const updatedMessage = { ...message, read: true };
        this.messages.set(message.id, updatedMessage);
      });
  }

  async getUnreadMessageCount(creatorId: number): Promise<number> {
    return Array.from(this.messages.values())
      .filter(message => message.receiverId === creatorId && !message.read)
      .length;
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
        primaryPlatform: "instagram",
        otherPlatforms: "youtube,twitter",
        followers: 145000,
        engagementRate: 5,
        location: "Mumbai, India",
        languages: "English (Native), Hindi (Fluent)",
        contentCategories: "Wellness,Lifestyle,Fitness,Nutrition",
        verified: true,
      },
      {
        name: "Rahul Mehta",
        username: "rahulmehta",
        email: "rahul@example.com",
        password: "password123",
        bio: "Tech & Business advisor helping professionals grow their careers",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        primaryPlatform: "linkedin",
        otherPlatforms: "twitter,youtube",
        followers: 78000,
        engagementRate: 4,
        location: "Bangalore, India",
        languages: "English (Fluent), Hindi (Native)",
        contentCategories: "Business,Technology,Career Development,Leadership",
        verified: true,
      },
      {
        name: "Arjun Dev",
        username: "arjundev",
        email: "arjun@example.com",
        password: "password123",
        bio: "Travel & Photography enthusiast showing you the world",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        primaryPlatform: "youtube",
        otherPlatforms: "instagram,facebook",
        followers: 450000,
        engagementRate: 7,
        location: "Delhi, India",
        languages: "English (Fluent), Hindi (Native), French (Basic)",
        contentCategories: "Travel,Photography,Adventure,Lifestyle",
        verified: true,
      },
      {
        name: "Anjali Kapoor",
        username: "anjalikapoor",
        email: "anjali@example.com",
        password: "password123",
        bio: "Fashion and beauty creator helping you look and feel your best",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
        primaryPlatform: "instagram",
        otherPlatforms: "youtube,tiktok",
        followers: 89000,
        engagementRate: 6,
        location: "Mumbai, India",
        languages: "English (Fluent), Hindi (Native)",
        contentCategories: "Fashion,Beauty,Lifestyle,Makeup",
        verified: true,
      },
      {
        name: "Vikram Singh",
        username: "vikramsingh",
        email: "vikram@example.com",
        password: "password123",
        bio: "Fitness coach providing workout and nutrition guidance",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
        primaryPlatform: "youtube",
        otherPlatforms: "instagram,facebook",
        followers: 320000,
        engagementRate: 8,
        location: "Pune, India",
        languages: "English (Fluent), Hindi (Native), Punjabi (Native)",
        contentCategories: "Fitness,Nutrition,Wellness,Motivation",
        verified: true,
      },
      {
        name: "Neha Gupta",
        username: "nehagupta",
        email: "neha@example.com",
        password: "password123",
        bio: "Lifestyle creator sharing daily inspiration and tips",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
        primaryPlatform: "instagram",
        otherPlatforms: "tiktok,snapchat",
        followers: 45000,
        engagementRate: 5,
        location: "Jaipur, India",
        languages: "English (Fluent), Hindi (Native)",
        contentCategories: "Lifestyle,DIY,Home Decor,Cooking",
        verified: true,
      }
    ];

    // Create sample creators
    creators.forEach(creator => {
      const id = this.creatorCurrentId++;
      this.creators.set(id, {
        ...creator,
        id,
        bio: creator.bio ?? null,
        avatar: creator.avatar ?? null,
        otherPlatforms: creator.otherPlatforms ?? null,
        followers: creator.followers ?? null,
        engagementRate: creator.engagementRate ?? null,
        location: creator.location ?? null,
        languages: creator.languages ?? null,
        contentCategories: creator.contentCategories ?? null,
        verified: creator.verified ?? null
      });
    });

    // Add services for each creator
    const services: InsertService[] = [
      {
        creatorId: 1,
        title: "Sponsored Post",
        shortDescription: "Product feature with detailed review on Instagram",
        longDescription: "Get your product featured on my Instagram feed with a detailed, authentic review. Includes professional photography and custom caption highlighting your product's key benefits. Performance analytics provided after 7 days.",
        price: 25000,
        deliveryDays: 7,
        revisions: 2,
        deliverables: "1 Instagram Post,Professional Photography,Performance Report,Custom Caption"
      },
      {
        creatorId: 1,
        title: "1:1 Wellness Coaching",
        shortDescription: "60-minute personalized wellness session",
        longDescription: "A personalized wellness coaching session focused on your specific goals. We'll develop a tailored plan addressing nutrition, fitness, and mindfulness practices to help you achieve optimal wellbeing.",
        price: 3500,
        deliveryDays: 3,
        revisions: 0,
        deliverables: "60-minute Video Call,Customized Wellness Plan,2 Weeks of Follow-up Support"
      },
      {
        creatorId: 2,
        title: "Career Consultation",
        shortDescription: "Resume review & personalized career strategy",
        longDescription: "Get expert guidance on your career path with a comprehensive resume review and personalized strategy session. Includes LinkedIn profile optimization and networking strategies to help you land your dream job.",
        price: 7500,
        deliveryDays: 5,
        revisions: 1,
        deliverables: "Resume Review,LinkedIn Profile Optimization,60-minute Strategy Call,30-day Action Plan"
      },
      {
        creatorId: 2,
        title: "Tech Webinar",
        shortDescription: "Sponsored tech talk for your team",
        longDescription: "Engage your team with a customized tech webinar on emerging technologies, digital transformation, or leadership in tech. Content will be tailored to your company's specific needs and industry challenges.",
        price: 35000,
        deliveryDays: 14,
        revisions: 2,
        deliverables: "90-minute Interactive Webinar,Q&A Session,Presentation Slides,Resource Guide"
      },
      {
        creatorId: 3,
        title: "Destination Feature",
        shortDescription: "Dedicated travel vlog featuring your location",
        longDescription: "Showcase your destination with a professionally produced travel vlog. I'll visit your location, capture stunning footage, and create an engaging story that highlights the unique experiences your destination offers.",
        price: 50000,
        deliveryDays: 30,
        revisions: 1,
        deliverables: "10-15 minute YouTube Video,Instagram Stories Coverage,Professional Editing,Location Tags and Mentions"
      },
      {
        creatorId: 3,
        title: "Photography Masterclass",
        shortDescription: "2-hour group workshop on travel photography",
        longDescription: "Learn the art of capturing stunning travel photos in this interactive workshop. I'll share my techniques for composition, lighting, editing, and storytelling that have helped me build a successful travel content business.",
        price: 2000,
        deliveryDays: 7,
        revisions: 0,
        deliverables: "2-hour Live Workshop,Editing Presets Pack,Technique Guide PDF,Q&A Session"
      },
      {
        creatorId: 4,
        title: "Fashion Collaboration",
        shortDescription: "Styling and outfit review for your brand",
        longDescription: "Showcase your fashion brand with a customized styling collaboration. I'll create content featuring your products styled in multiple ways, providing my authentic perspective on quality, fit, and styling possibilities.",
        price: 30000,
        deliveryDays: 10,
        revisions: 2,
        deliverables: "Instagram Post,3 Instagram Stories,Behind-the-Scenes Content,Styling Tips"
      },
      {
        creatorId: 5,
        title: "Fitness Program",
        shortDescription: "Custom 4-week workout and nutrition plan",
        longDescription: "Transform your fitness with a fully customized 4-week program tailored to your goals, experience level, and available equipment. Includes workout routines, nutrition guidance, and weekly check-ins to keep you accountable.",
        price: 5000,
        deliveryDays: 5,
        revisions: 1,
        deliverables: "Custom Workout Plan,Nutrition Guide,Exercise Demonstration Videos,Weekly Check-ins"
      },
      {
        creatorId: 6,
        title: "Lifestyle Promotion",
        shortDescription: "Product integration in daily content",
        longDescription: "Seamlessly integrate your product into my authentic lifestyle content. Your product will be featured naturally in my daily routines, showing my audience how it enhances my life in a genuine, relatable way.",
        price: 15000,
        deliveryDays: 14,
        revisions: 1,
        deliverables: "1 Instagram Post,3 Instagram Stories,Content Usage Rights,Performance Analytics"
      }
    ];

    // Create sample services
    services.forEach(service => {
      const id = this.serviceCurrentId++;
      this.services.set(id, {
        ...service,
        id,
        revisions: service.revisions ?? null
      });
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
      this.testimonials.set(id, {
        ...testimonial,
        id,
        avatar: testimonial.avatar ?? null,
        followers: testimonial.followers ?? null
      });
    });

    // Add sample conversations and messages
    // Conversation between Priya and Rahul
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    // Conversation 1: Priya (1) and Rahul (2)
    const conversation1: Conversation = {
      id: this.conversationCurrentId++,
      creator1Id: 1, // Priya
      creator2Id: 2, // Rahul
      lastMessageAt: now,
      createdAt: threeDaysAgo
    };
    this.conversations.set(conversation1.id, conversation1);

    // Conversation 2: Priya (1) and Arjun (3)
    const conversation2: Conversation = {
      id: this.conversationCurrentId++,
      creator1Id: 1, // Priya
      creator2Id: 3, // Arjun
      lastMessageAt: twoHoursAgo,
      createdAt: threeDaysAgo
    };
    this.conversations.set(conversation2.id, conversation2);

    // Add messages to conversation 1
    const messages1: Message[] = [
      {
        id: this.messageCurrentId++,
        conversationId: conversation1.id,
        senderId: 1, // Priya
        receiverId: 2, // Rahul
        content: "Hi Rahul, I was wondering if you'd be interested in collaborating on a wellness tech series?",
        read: true,
        createdAt: threeDaysAgo
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation1.id,
        senderId: 2, // Rahul
        receiverId: 1, // Priya
        content: "Hi Priya! That sounds interesting. What kind of collaboration did you have in mind?",
        read: true,
        createdAt: new Date(threeDaysAgo.getTime() + 30 * 60 * 1000) // 30 minutes later
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation1.id,
        senderId: 1, // Priya
        receiverId: 2, // Rahul
        content: "I'm thinking of a series on how technology can help with wellness tracking and mental health. Your tech expertise combined with my wellness focus could make great content.",
        read: true,
        createdAt: twoHoursAgo
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation1.id,
        senderId: 2, // Rahul
        receiverId: 1, // Priya
        content: "That's a great idea! I've been exploring some AI-powered wellness apps recently that could be perfect for this. When would you like to start?",
        read: true,
        createdAt: oneHourAgo
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation1.id,
        senderId: 1, // Priya
        receiverId: 2, // Rahul
        content: "How about next week? We could do a planning session on Monday and maybe film the first episode on Thursday?",
        read: false, // Unread message
        createdAt: now
      }
    ];

    // Add messages to conversation 2
    const messages2: Message[] = [
      {
        id: this.messageCurrentId++,
        conversationId: conversation2.id,
        senderId: 3, // Arjun
        receiverId: 1, // Priya
        content: "Hey Priya, I loved your recent wellness retreat vlog. The location looked amazing!",
        read: true,
        createdAt: threeDaysAgo
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation2.id,
        senderId: 1, // Priya
        receiverId: 3, // Arjun
        content: "Thanks Arjun! It was in the hills near Rishikesh. I'd be happy to connect you with the property owner if you're interested in featuring it.",
        read: true,
        createdAt: new Date(threeDaysAgo.getTime() + 2 * 60 * 60 * 1000) // 2 hours later
      },
      {
        id: this.messageCurrentId++,
        conversationId: conversation2.id,
        senderId: 3, // Arjun
        receiverId: 1, // Priya
        content: "That would be incredible! I'm planning a wellness travel series and that location would be perfect.",
        read: true,
        createdAt: twoHoursAgo
      }
    ];

    // Store all messages
    [...messages1, ...messages2].forEach(message => {
      this.messages.set(message.id, message);
    });
  }
}

export const storage = new MemStorage();
