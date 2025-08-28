"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-8 py-10 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white">
            RUTE<span className="text-green-500">.</span>
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Reliable home services at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-green-500">Find Providers</Link></li>
            <li><Link href="#" className="hover:text-green-500">Services</Link></li>
            <li><Link href="#" className="hover:text-green-500">Shop</Link></li>
            <li><Link href="#" className="hover:text-green-500">How it Works</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="#" className="hover:text-green-500"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-green-500"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-green-500"><Twitter size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} RUTE. All rights reserved.
      </div>
    </footer>
  );
}
