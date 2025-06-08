import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clothingItems = pgTable("clothing_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in rupees
  category: text("category").notNull(), // sarees, lehengas, salwar, mens, etc.
  image: text("image").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
});

export const customOrders = pgTable("custom_orders", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email"),
  clothingType: text("clothing_type").notNull(),
  occasion: text("occasion"),
  budgetRange: text("budget_range"),
  designDescription: text("design_description"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const alterationRequests = pgTable("alteration_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  contactNumber: text("contact_number").notNull(),
  garmentType: text("garment_type").notNull(),
  alterationsNeeded: text("alterations_needed").notNull(), // JSON string of selected alterations
  specialInstructions: text("special_instructions"),
  preferredDate: text("preferred_date"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClothingItemSchema = createInsertSchema(clothingItems).omit({
  id: true,
});

export const insertCustomOrderSchema = createInsertSchema(customOrders).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertAlterationRequestSchema = createInsertSchema(alterationRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ClothingItem = typeof clothingItems.$inferSelect;
export type InsertClothingItem = z.infer<typeof insertClothingItemSchema>;

export type CustomOrder = typeof customOrders.$inferSelect;
export type InsertCustomOrder = z.infer<typeof insertCustomOrderSchema>;

export type AlterationRequest = typeof alterationRequests.$inferSelect;
export type InsertAlterationRequest = z.infer<typeof insertAlterationRequestSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
