import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import CatalogSection from "@/components/catalog-section";
import OrderSection from "@/components/order-section";
import ProcessSection from "@/components/process-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <CatalogSection />
        <OrderSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
