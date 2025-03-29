import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Creator model
export const creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  primaryPlatform: text("primary_platform").notNull(), // instagram, youtube, etc
  otherPlatforms: text("other_platforms"), // comma-separated list of other platforms
  followers: integer("followers"),
  engagementRate: integer("engagement_rate"), // stored as percentage value (e.g. 5 = 5%)
  location: text("location"),
  languages: text("languages"), // comma-separated list of languages e.g. "English (Native), Hindi (Fluent)"
  contentCategories: text("content_categories"), // comma-separated list of categories
  verified: boolean("verified").default(false),
});

// Service model (services offered by creators)
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  price: integer("price").notNull(), // in cents/paise
  deliveryDays: integer("delivery_days").notNull(),
  revisions: integer("revisions").default(1),
  deliverables: text("deliverables").notNull(), // comma-separated list of deliverables
});

// Testimonial model
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  platform: text("platform").notNull(),
  followers: integer("followers"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

// Contact form model
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertCreatorSchema = createInsertSchema(creators).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

// Types
export type InsertCreator = z.infer<typeof insertCreatorSchema>;
export type Creator = typeof creators.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
