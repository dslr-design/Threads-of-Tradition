import { 
  users, 
  clothingItems, 
  customOrders, 
  alterationRequests, 
  inquiries,
  type User, 
  type InsertUser,
  type ClothingItem,
  type InsertClothingItem,
  type CustomOrder,
  type InsertCustomOrder,
  type AlterationRequest,
  type InsertAlterationRequest,
  type Inquiry,
  type InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Clothing Items
  getAllClothingItems(): Promise<ClothingItem[]>;
  getClothingItemsByCategory(category: string): Promise<ClothingItem[]>;
  getClothingItem(id: number): Promise<ClothingItem | undefined>;
  createClothingItem(item: InsertClothingItem): Promise<ClothingItem>;
  
  // Custom Orders
  getAllCustomOrders(): Promise<CustomOrder[]>;
  getCustomOrder(id: number): Promise<CustomOrder | undefined>;
  createCustomOrder(order: InsertCustomOrder): Promise<CustomOrder>;
  
  // Alteration Requests
  getAllAlterationRequests(): Promise<AlterationRequest[]>;
  getAlterationRequest(id: number): Promise<AlterationRequest | undefined>;
  createAlterationRequest(request: InsertAlterationRequest): Promise<AlterationRequest>;
  
  // Inquiries
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clothingItems: Map<number, ClothingItem>;
  private customOrders: Map<number, CustomOrder>;
  private alterationRequests: Map<number, AlterationRequest>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentClothingItemId: number;
  private currentCustomOrderId: number;
  private currentAlterationRequestId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.clothingItems = new Map();
    this.customOrders = new Map();
    this.alterationRequests = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentClothingItemId = 1;
    this.currentCustomOrderId = 1;
    this.currentAlterationRequestId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample clothing items
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleItems: InsertClothingItem[] = [
      {
        name: "Banarasi Silk Saree",
        description: "Hand-woven silk with traditional golden zari work",
        price: 12500,
        category: "sarees",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      },
      {
        name: "Bridal Lehenga Set",
        description: "Heavy embroidered bridal lehenga with dupatta",
        price: 25000,
        category: "lehengas",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      },
      {
        name: "Cotton Salwar Set",
        description: "Comfortable daily wear with matching dupatta",
        price: 3200,
        category: "salwar",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      },
      {
        name: "Wedding Sherwani",
        description: "Traditional groom's sherwani with churidar",
        price: 8500,
        category: "mens",
        image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      },
      {
        name: "Designer Print Saree",
        description: "Contemporary printed saree for occasions",
        price: 4800,
        category: "sarees",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      },
      {
        name: "Party Wear Lehenga",
        description: "Light-weight lehenga perfect for celebrations",
        price: 15500,
        category: "lehengas",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        inStock: true
      }
    ];

    sampleItems.forEach(item => {
      this.createClothingItem(item);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Clothing Items
  async getAllClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values());
  }

  async getClothingItemsByCategory(category: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.category === category
    );
  }

  async getClothingItem(id: number): Promise<ClothingItem | undefined> {
    return this.clothingItems.get(id);
  }

  async createClothingItem(insertItem: InsertClothingItem): Promise<ClothingItem> {
    const id = this.currentClothingItemId++;
    const item: ClothingItem = { ...insertItem, id };
    this.clothingItems.set(id, item);
    return item;
  }

  // Custom Orders
  async getAllCustomOrders(): Promise<CustomOrder[]> {
    return Array.from(this.customOrders.values());
  }

  async getCustomOrder(id: number): Promise<CustomOrder | undefined> {
    return this.customOrders.get(id);
  }

  async createCustomOrder(insertOrder: InsertCustomOrder): Promise<CustomOrder> {
    const id = this.currentCustomOrderId++;
    const order: CustomOrder = { 
      ...insertOrder, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.customOrders.set(id, order);
    return order;
  }

  // Alteration Requests
  async getAllAlterationRequests(): Promise<AlterationRequest[]> {
    return Array.from(this.alterationRequests.values());
  }

  async getAlterationRequest(id: number): Promise<AlterationRequest | undefined> {
    return this.alterationRequests.get(id);
  }

  async createAlterationRequest(insertRequest: InsertAlterationRequest): Promise<AlterationRequest> {
    const id = this.currentAlterationRequestId++;
    const request: AlterationRequest = { 
      ...insertRequest, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.alterationRequests.set(id, request);
    return request;
  }

  // Inquiries
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
