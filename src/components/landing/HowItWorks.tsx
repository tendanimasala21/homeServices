"use client";

import { ClipboardList, CheckCircle, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Pick a service",
      desc: "Choose from cleaning, gardening, handyman & more",
      icon: ClipboardList,
    },
    {
      title: "Match instantly",
      desc: "See availability, ratings & upfront prices",
      icon: CheckCircle,
    },
    {
      title: "Pay securely",
      desc: "Cashless checkout, receipts & support in-app",
      icon: CreditCard,
    },
  ];

  return (
    <section className="px-8 py-20 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How it <span className="text-green-600">Works</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Booking your home services is quick, easy, and 100% hassle-free.
        </p>
      </div>

      {/* Steps */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                <Icon className="w-7 h-7" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
