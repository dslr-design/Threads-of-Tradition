import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCustomOrderSchema,
  insertAlterationRequestSchema,
  insertInquirySchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all clothing items
  app.get("/api/clothing-items", async (req, res) => {
    try {
      const items = await storage.getAllClothingItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing items" });
    }
  });

  // Get clothing items by category
  app.get("/api/clothing-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getClothingItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing items by category" });
    }
  });

  // Get single clothing item
  app.get("/api/clothing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getClothingItem(id);
      if (!item) {
        return res.status(404).json({ message: "Clothing item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clothing item" });
    }
  });

  // Create custom order
  app.post("/api/custom-orders", async (req, res) => {
    try {
      const validatedData = insertCustomOrderSchema.parse(req.body);
      const order = await storage.createCustomOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid order data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create custom order" });
    }
  });

  // Get all custom orders
  app.get("/api/custom-orders", async (req, res) => {
    try {
      const orders = await storage.getAllCustomOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom orders" });
    }
  });

  // Create alteration request
  app.post("/api/alteration-requests", async (req, res) => {
    try {
      const validatedData = insertAlterationRequestSchema.parse(req.body);
      const request = await storage.createAlterationRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid alteration request data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create alteration request" });
    }
  });

  // Get all alteration requests
  app.get("/api/alteration-requests", async (req, res) => {
    try {
      const requests = await storage.getAllAlterationRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alteration requests" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid inquiry data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Get all inquiries
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
