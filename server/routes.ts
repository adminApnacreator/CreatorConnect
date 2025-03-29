import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertServiceSchema,
  insertCreatorSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all creators
  app.get("/api/creators", async (req, res) => {
    try {
      const creators = await storage.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  // Get creator by id
  app.get("/api/creators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      const creator = await storage.getCreator(id);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      res.json(creator);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  // Get services for a creator
  app.get("/api/creators/:id/services", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      const creator = await storage.getCreator(id);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      const services = await storage.getServices(id);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Get a single service by ID
  app.get("/api/creators/:id/services/:serviceId", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      const serviceId = parseInt(req.params.serviceId);
      
      if (isNaN(creatorId) || isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid creator or service ID" });
      }

      // First verify creator exists
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Get all services for this creator
      const services = await storage.getServices(creatorId);
      const service = services.find(s => s.id === serviceId);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create a new service
  app.post("/api/creators/:id/services", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      // Verify creator exists
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Validate the request body
      const validatedData = insertServiceSchema.parse({
        ...req.body,
        creatorId // Ensure the creatorId from the URL is used
      });

      // Create the service
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  // Update an existing service (would need to be implemented in storage.ts)
  app.patch("/api/creators/:id/services/:serviceId", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      const serviceId = parseInt(req.params.serviceId);
      
      if (isNaN(creatorId) || isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid creator or service ID" });
      }

      // Verify creator exists
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Get services to verify service exists and belongs to creator
      const services = await storage.getServices(creatorId);
      const existingService = services.find(s => s.id === serviceId);
      
      if (!existingService) {
        return res.status(404).json({ message: "Service not found or doesn't belong to this creator" });
      }

      // For now we'll just return the existing service as memory storage doesn't support updates
      // In a real implementation, you would update the service in the database
      res.json(existingService);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  // Get creator earnings (mock data for now)
  app.get("/api/creators/:id/earnings", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      // Verify creator exists
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Mock earnings data
      const earningsData = [
        { month: "Jan", amount: 2450 },
        { month: "Feb", amount: 3800 },
        { month: "Mar", amount: 3100 },
        { month: "Apr", amount: 4500 },
        { month: "May", amount: 5200 },
        { month: "Jun", amount: 4800 },
      ];

      res.json({
        earnings: earningsData,
        stats: {
          totalEarned: 23850,
          growthPercentage: 24,
          activeOrders: 7,
          activeOrdersValue: 4500,
          completionRate: 98
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch earnings" });
    }
  });

  // Get creator tasks/requests (mock data for now)
  app.get("/api/creators/:id/tasks", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      // Verify creator exists
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Mock tasks data
      const tasksData = [
        {
          id: 1,
          title: "Sponsored Post for TechGadget",
          dueDate: "2025-04-05",
          status: "pending",
          amount: 1500,
          clientName: "TechGadget Inc.",
          clientAvatar: "https://ui-avatars.com/api/?name=TG&background=3498db&color=fff"
        },
        {
          id: 2,
          title: "Career Consultation for Marketing Student",
          dueDate: "2025-04-10",
          status: "confirmed",
          amount: 200,
          clientName: "Rohan Mehta",
          clientAvatar: "https://ui-avatars.com/api/?name=RM&background=2ecc71&color=fff"
        },
        {
          id: 3,
          title: "Guest Post on Finance Blog",
          dueDate: "2025-04-15",
          status: "in_progress",
          amount: 750,
          clientName: "FinancePro Media",
          clientAvatar: "https://ui-avatars.com/api/?name=FP&background=e74c3c&color=fff"
        }
      ];

      res.json(tasksData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
