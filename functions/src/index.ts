import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

// Sample memory storage implementation for demo purposes
class MemStorage {
  private creators: any[];
  private services: any[];
  private testimonials: any[];
  private contactMessages: any[];

  constructor() {
    // Initialize with sample data
    this.creators = [
      {
        id: 1,
        name: "Priya Sharma",
        username: "priyasharma",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        bio: "Fashion and lifestyle influencer with a passion for sustainable living",
        category: "Fashion",
        platform: "Instagram",
        followerCount: 150000,
        location: "Mumbai, India"
      },
      {
        id: 2,
        name: "Rahul Mehta",
        username: "rahulmehta",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Career coach and LinkedIn content creator helping professionals navigate their career growth",
        category: "Business",
        platform: "LinkedIn",
        followerCount: 85000,
        location: "Bangalore, India"
      },
      {
        id: 3,
        name: "Ananya Patel",
        username: "ananyapatel",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        bio: "Travel vlogger exploring hidden gems across India",
        category: "Travel",
        platform: "YouTube",
        followerCount: 220000,
        location: "Delhi, India"
      }
    ];

    this.services = [
      {
        id: 1,
        creatorId: 1,
        title: "Sponsored Post",
        description: "Sponsored Instagram post featuring your brand with authentic storytelling",
        price: 25000,
        deliveryDays: 5
      },
      {
        id: 2,
        creatorId: 1,
        title: "Instagram Story Series",
        description: "A series of 5 Instagram stories highlighting your product/service",
        price: 15000,
        deliveryDays: 3
      },
      {
        id: 3,
        creatorId: 2,
        title: "Career Consultation",
        description: "1-hour personalized career growth strategy session",
        price: 3500,
        deliveryDays: 7
      },
      {
        id: 4,
        creatorId: 2,
        title: "LinkedIn Profile Optimization",
        description: "Complete LinkedIn profile review and optimization",
        price: 5000,
        deliveryDays: 5
      },
      {
        id: 5,
        creatorId: 3,
        title: "Destination Feature",
        description: "Feature your tourist destination in my travel vlog",
        price: 30000,
        deliveryDays: 14
      },
      {
        id: 6,
        creatorId: 3,
        title: "Travel Photography",
        description: "Professional travel photography for your brand/location",
        price: 18000,
        deliveryDays: 10
      }
    ];

    this.testimonials = [
      {
        id: 1,
        name: "Vikram Rajput",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        company: "StyleGuru Clothing",
        content: "Working with Priya was an absolute pleasure. Her authentic approach to showcasing our sustainable clothing line resulted in a 40% increase in website traffic and a significant boost in sales.",
        rating: 5
      },
      {
        id: 2,
        name: "Sneha Gupta",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        company: "TechStart India",
        content: "Rahul's LinkedIn strategy session transformed our company's social media presence. His insights were practical and immediately actionable, helping us connect with the right talent pool.",
        rating: 5
      },
      {
        id: 3,
        name: "Arjun Kapoor",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        company: "Himalayan Retreats",
        content: "The exposure our resort received from Ananya's travel vlog exceeded all expectations. Her authentic storytelling brought us bookings from across the country. Highly recommended!",
        rating: 4
      }
    ];

    this.contactMessages = [];
  }

  getAllCreators() {
    return this.creators;
  }

  getCreator(id: number) {
    return this.creators.find(creator => creator.id === id);
  }

  getServices(creatorId: number) {
    return this.services.filter(service => service.creatorId === creatorId);
  }

  getAllTestimonials() {
    return this.testimonials;
  }

  createContactMessage(message: any) {
    const id = this.contactMessages.length + 1;
    const contactMessage = { ...message, id, createdAt: new Date().toISOString() };
    this.contactMessages.push(contactMessage);
    return contactMessage;
  }
}

const storage = new MemStorage();
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.get('/api/creators', (req, res) => {
  res.json(storage.getAllCreators());
});

app.get('/api/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const creator = storage.getCreator(id);
  if (!creator) {
    return res.status(404).json({ error: 'Creator not found' });
  }
  res.json(creator);
});

app.get('/api/creators/:id/services', (req, res) => {
  const creatorId = parseInt(req.params.id);
  res.json(storage.getServices(creatorId));
});

app.get('/api/testimonials', (req, res) => {
  res.json(storage.getAllTestimonials());
});

app.post('/api/contact', (req, res) => {
  try {
    const message = storage.createContactMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);