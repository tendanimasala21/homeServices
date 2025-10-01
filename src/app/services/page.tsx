"use client";

import Navbar from "@/components/landing/Navbar";
import ServiceCard from "@/components/landing/ServiceCard";
import {Package, Sprout, Truck, Wrench, Shirt, Sparkles } from "lucide-react";
// import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

const services = [
  { title: "Home Cleaning", price: "From R299", icon: Sparkles },
  { title: "Move In/Out Clean", price: "From R699", icon: Package },
  { title: "Gardening", price: "From R249", icon: Sprout },
  { title: "Rubble Removal", price: "From R499", icon: Truck },
  { title: "Handyman", price: "From R350", icon: Wrench },
  { title: "Laundry & Ironing", price: "From R199", icon: Shirt },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="px-8 py-20 bg-gradient-to-r from-green-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          From home cleaning to handyman tasks — we connect you with trusted pros at upfront prices.
        </p>
      </section>

      {/* Services Grid */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to book a service?</h2>
        <p className="mt-2 text-green-100">Fast, reliable, and affordable home services at your fingertips.</p>
        <Link
          href="#"
          className="inline-block mt-6 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book Now
        </Link>
      </section>
    </main>
  );
}
