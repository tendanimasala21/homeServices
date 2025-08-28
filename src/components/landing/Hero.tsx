"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-b from-white to-gray-50">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Book reliable cleaners <br className="hidden sm:block" /> & home
          services in minutes
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-md">
          Vetted pros, upfront pricing, and secure payments. Serving
          Johannesburg, Pretoria, Cape Town & Durban.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex w-full max-w-lg rounded-lg shadow-md overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search a service (e.g. cleaning, handyman)"
            className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
          />
          <button className="px-5 py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition">
            Book a cleaner
          </button>
        </div>
      </motion.div>

      {/* Right side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <Image
          src="/illustrations/clean-up.svg"
          alt="Cleaning Illustration"
          width={500}
          height={400}
          className="w-full h-auto max-w-md"
        />
      </motion.div>
    </section>
  );
}
