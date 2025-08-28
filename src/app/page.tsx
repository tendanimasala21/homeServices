import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import ServicesGrid from "@/components/landing/ServiceGrid";

export default function Home() {
  return(
    <div className="p-5">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <Footer />
    </div>
  )
}