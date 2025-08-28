"use client";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: string;
  icon: LucideIcon;
}

export default function ServiceCard({ title, price, icon: Icon }: ServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
        <Icon className="w-6 h-6" />
      </div>

      {/* Title & Price */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{price}</p>

      {/* CTA */}
      <button className="mt-4 text-green-600 font-medium hover:underline">
        Book Now →
      </button>
    </div>
  );
}
