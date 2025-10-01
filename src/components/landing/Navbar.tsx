"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Wrench,
  ShoppingBag,
  Info,
  ShoppingCart,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const navItems = [
    { name: "Find Providers", href: "#", icon: <Search className="w-4 h-4" /> },
    { name: "Services", href: "/services", icon: <Wrench className="w-4 h-4" /> },
    { name: "Shop", href: "/shop", icon: <ShoppingBag className="w-4 h-4" /> },
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
          <li
            key={i}
            className="flex items-center gap-2 hover:text-green-600 transition"
          >
            {item.icon}
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Book Now */}
        <Link
          href="#"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition hidden md:block"
        >
          Book now
        </Link>

        {/* Profile Icon */}
        <Link href="/profile" className="relative">
          <User className="w-6 h-6 text-gray-700 hover:text-green-600 transition" />
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600 transition" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

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

            {/* Profile inside mobile menu */}
            <Link
              href="/profile"
              className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
            >
              <User className="w-4 h-4" /> Profile
            </Link>

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
