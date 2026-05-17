import { CheckCircle } from "lucide-react";

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-display font-bold text-primary mb-4">How It Works</h3>
          <p className="text-xl text-accent">Simple steps to get your perfect outfit</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="text-xl font-semibold text-primary mb-3">Consultation</h4>
            <p className="text-accent">Discuss your requirements and design preferences</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-secondary">2</span>
            </div>
            <h4 className="text-xl font-semibold text-primary mb-3">Measurements</h4>
            <p className="text-accent">Precise measurements for perfect fitting</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-accent">3</span>
            </div>
            <h4 className="text-xl font-semibold text-primary mb-3">Creation</h4>
            <p className="text-accent">Expert craftsmanship bringing your vision to life</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
            <h4 className="text-xl font-semibold text-primary mb-3">Delivery</h4>
            <p className="text-accent">Final fitting and delivery of your perfect outfit</p>
          </div>
        </div>

        {/* Showcase of sewing process */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-3xl font-display font-bold text-primary mb-6">Crafted with Precision</h4>
            <p className="text-lg text-accent mb-6">
              Our master tailors bring over 25 years of experience in traditional Indian clothing. 
              Every stitch is placed with care, every measurement taken with precision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-secondary mr-4" />
                <span className="text-accent">Hand-stitched finishing for durability</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-secondary mr-4" />
                <span className="text-accent">Quality fabrics from trusted suppliers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-secondary mr-4" />
                <span className="text-accent">Traditional techniques with modern precision</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-secondary mr-4" />
                <span className="text-accent">3-7 days delivery for most orders</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Master tailor working on traditional Indian clothing" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Colorful fabric patterns and materials" 
                className="rounded-lg shadow-md w-full h-auto" 
              />
              <img 
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Traditional sewing tools and accessories" 
                className="rounded-lg shadow-md w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
