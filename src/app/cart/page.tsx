"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />
      
      <main className="px-6 py-16 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl shadow-inner">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Replace this div with <img src={item.image} ... /> once you have images */}
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      R{item.price} each
                    </p>
                  </div>

                  {/* Quantity + Remove Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        item.quantity && item.quantity > 1
                          ? removeFromCart(item.id) // decrease by 1
                          : removeFromCart(item.id) // remove if 1
                      }
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{item.quantity || 1}</span>
                    <button
                      onClick={() => addToCart(item)} // increase
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total:</span>
                <span className="text-green-600">R{total.toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 px-4 py-3 text-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
