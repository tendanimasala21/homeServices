"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { CreditCard, User, Mail, Home, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <main className="px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-8 h-8 text-green-600" />
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
        {/* Customer Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-2">Customer Information</h2>

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <User className="ml-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full px-3 py-2 outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Mail className="ml-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full px-3 py-2 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <div className="flex items-start border rounded-lg overflow-hidden">
              <Home className="ml-3 mt-3 text-gray-400 w-5 h-5" />
              <textarea
                required
                className="w-full px-3 py-2 outline-none resize-none"
                placeholder="123 Main Street, Johannesburg"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-medium">
                      R{(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">
                    R{total.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Payment Section Placeholder */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Payment</h2>
            <div className="flex items-center border rounded-lg overflow-hidden px-3 py-2">
              <CreditCard className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Card details (mockup only)"
                disabled
                className="w-full bg-gray-50 text-gray-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              (Payment gateway integration coming soon)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              href="/cart"
              className="flex-1 px-4 py-3 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
