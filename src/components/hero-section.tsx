import { ShoppingBag, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-display font-bold text-primary mb-6">
                Crafting Traditional Indian Elegance
              </h2>
              <p className="text-xl text-accent mb-8 leading-relaxed">
                From custom-made sarees to perfect alterations, we bring decades of expertise to preserve the beauty of Indian craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('catalog')}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollToSection('order')}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  <Scissors className="mr-2 h-4 w-4" />
                  Book Alteration
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Beautiful Indian sarees and traditional clothing" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-4 rounded-xl shadow-lg">
                <p className="font-semibold">25+ Years Experience</p>
                <p className="text-sm opacity-90">Master Tailoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
