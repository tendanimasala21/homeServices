"use client";

import { useState } from "react";
import { Droplets, Flame, TreePine, Layers } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number; // ✅ fixed type
  category: "household" | "energy";
  icon: React.ReactNode;
};

const products: Product[] = [
  {
    id: 1,
    name: "Floor Polish",
    price: 49,
    category: "household",
    icon: <Droplets className="w-8 h-8 text-green-600" />,
  },
  {
    id: 2,
    name: "Tissues (Pack of 6)",
    price: 39,
    category: "household",
    icon: <Layers className="w-8 h-8 text-green-600" />,
  },
  {
    id: 3,
    name: "Gas Cylinder Refill",
    price: 250,
    category: "energy",
    icon: <Flame className="w-8 h-8 text-green-600" />,
  },
  {
    id: 4,
    name: "Firewood Bundle",
    price: 80,
    category: "energy",
    icon: <TreePine className="w-8 h-8 text-green-600" />,
  },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<"all" | "household" | "energy">("all");
  const { addToCart } = useCart(); // ✅ hook from CartContext

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="px-8 py-16 bg-gradient-to-r from-green-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Shop Household Essentials
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Find everything from cleaning supplies to firewood & gas — delivered
          to your door.
        </p>
      </section>

      {/* Filters */}
      <section className="px-8 py-6 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("household")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "household"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Household Essentials
        </button>
        <button
          onClick={() => setFilter("energy")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "energy"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Energy & Fuel
        </button>
      </section>

      {/* Products Grid */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="mb-3">{product.icon}</div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-green-600 font-medium mt-1">
                R{product.price}
              </p>
              <button
                onClick={() => addToCart(product)} // ✅ add to cart works
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
