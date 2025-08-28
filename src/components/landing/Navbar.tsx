"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Wrench, ShoppingBag, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Find Providers", href: "#", icon: <Search className="w-4 h-4" /> },
    { name: "Services", href: "#", icon: <Wrench className="w-4 h-4" /> },
    { name: "Shop", href: "#", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "How it works", href: "#", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold">
        RUTE<span className="text-green-600">.</span>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 text-gray-700">
        {navItems.map((item, i) => (
          <li key={i} className="flex items-center gap-2 hover:text-green-600 transition">
            {item.icon}
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Book Now button */}
      <Link
        href="#"
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition hidden md:block"
      >
        Book now
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 md:hidden z-40"
          >
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <Link
              href="#"
              className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-center"
            >
              Book now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
