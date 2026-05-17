import { Scissors } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="h-8 w-8 text-secondary" />
              <h5 className="text-xl font-display font-semibold">Threads of Tradition</h5>
            </div>
            <p className="text-white/80 mb-4">
              Preserving the art of traditional Indian clothing with modern precision and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-secondary transition-colors">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-secondary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-secondary transition-colors">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul className="space-y-2 text-white/80">
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="hover:text-secondary transition-colors"
                >
                  Custom Sarees
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="hover:text-secondary transition-colors"
                >
                  Designer Lehengas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('order')}
                  className="hover:text-secondary transition-colors"
                >
                  Alterations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="hover:text-secondary transition-colors"
                >
                  Men's Wear
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2 text-white/80">
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="hover:text-secondary transition-colors"
                >
                  View Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('order')}
                  className="hover:text-secondary transition-colors"
                >
                  Place Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-secondary transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Contact Info</h6>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>123 Fashion Street, Textile Market</li>
              <li>Mumbai, Maharashtra 400001</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@threadsoftradition.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-white/60">
          <p>
            &copy; 2024 Threads of Tradition. All rights reserved. |{" "}
            <a href="#" className="hover:text-secondary transition-colors">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
