import { Shirt, Scissors, Palette, Check } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-display font-bold text-primary mb-4">Our Services</h3>
          <p className="text-xl text-accent max-w-2xl mx-auto">
            We specialize in creating and perfecting traditional Indian garments with modern precision
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Custom Clothing */}
          <div className="bg-warm p-8 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Shirt className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-2xl font-display font-semibold text-primary mb-4">
              Custom Indian Clothing
            </h4>
            <p className="text-accent mb-6">
              Handcrafted sarees, lehengas, salwar kameez, and sherwanis made to your exact measurements and preferences.
            </p>
            <ul className="space-y-2 text-sm text-accent">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Traditional Sarees from ₹3,500
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Designer Lehengas from ₹8,000
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Salwar Sets from ₹2,500
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Men's Sherwanis from ₹4,500
              </li>
            </ul>
          </div>

          {/* Alterations */}
          <div className="bg-warm p-8 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Scissors className="h-8 w-8 text-secondary" />
            </div>
            <h4 className="text-2xl font-display font-semibold text-primary mb-4">
              Expert Alterations
            </h4>
            <p className="text-accent mb-6">
              Professional fitting and alteration services to ensure your garments fit perfectly and last longer.
            </p>
            <ul className="space-y-2 text-sm text-accent">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Size Adjustments from ₹200
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Blouse Alterations from ₹300
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Length Adjustments from ₹150
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Emergency Repairs from ₹100
              </li>
            </ul>
          </div>

          {/* Design Consultation */}
          <div className="bg-warm p-8 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <Palette className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-2xl font-display font-semibold text-primary mb-4">
              Design Consultation
            </h4>
            <p className="text-accent mb-6">
              Personal styling sessions to help you choose the perfect design, fabric, and colors for your special occasions.
            </p>
            <ul className="space-y-2 text-sm text-accent">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Wedding Collections
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Festival Wear
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Party Outfits
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-secondary mr-2" />
                Corporate Events
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
