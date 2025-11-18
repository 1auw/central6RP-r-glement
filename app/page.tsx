import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhySection from "@/components/WhySection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsSection />
      <WhySection />
      <EventsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

