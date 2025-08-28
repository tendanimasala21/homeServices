"use client";

import ServiceCard from "./ServiceCard";
import {
  Package,
  Leaf,
  Truck,
  Wrench,
  Shirt,
  Sparkles,
} from "lucide-react";

const services = [
  { title: "Home Cleaning", price: "From R299", icon: Sparkles},
  { title: "Move In/Out Clean", price: "From R699", icon: Package },
  { title: "Gardening", price: "From R249", icon: Leaf },
  { title: "Rubble Removal", price: "From R499", icon: Truck },
  { title: "Plumber", price: "From R350", icon: Wrench },
  { title: "Laundry & Ironing", price: "From R199", icon: Shirt },
];

export default function ServicesGrid() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Popular <span className="text-green-600">Services</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Book trusted professionals for your home needs in just a few clicks. 
          Transparent pricing and reliable service — guaranteed.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </section>
  );
}
