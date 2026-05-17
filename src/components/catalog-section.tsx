import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClothingItem } from "@shared/schema";

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: clothingItems = [], isLoading } = useQuery<ClothingItem[]>({
    queryKey: ["/api/clothing-items"],
  });

  const filteredItems = activeFilter === "all" 
    ? clothingItems 
    : clothingItems.filter(item => item.category === activeFilter);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "sarees", label: "Sarees" },
    { id: "lehengas", label: "Lehengas" },
    { id: "salwar", label: "Salwar Kameez" },
    { id: "mens", label: "Men's Wear" },
  ];

  const scrollToOrder = () => {
    const section = document.getElementById('order');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section id="catalog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-display font-bold text-primary mb-4">Our Collection</h3>
            <p className="text-xl text-accent">Loading our beautiful collection...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-10 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-display font-bold text-primary mb-4">Our Collection</h3>
          <p className="text-xl text-accent">
            Discover our range of traditional and contemporary Indian clothing
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              variant={activeFilter === category.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category.id
                  ? "bg-primary text-white"
                  : "bg-white text-accent border border-gray-200 hover:bg-primary hover:text-white"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <h5 className="text-lg font-semibold text-primary mb-2">{item.name}</h5>
                <p className="text-accent text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-secondary">₹{item.price.toLocaleString()}</span>
                  <Button 
                    onClick={scrollToOrder}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-accent">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
