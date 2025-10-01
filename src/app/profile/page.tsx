"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { User, Mail, Home, Phone, ShoppingBag } from "lucide-react";

export default function ProfilePage() {
    // Mock user data (replace with real auth later)
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main Street, Johannesburg",
        phone: "012 345 6789",
        orders: [
            { id: 1, total: 799.99, status: "Delivered" },
            { id: 2, total: 299.5, status: "Processing" },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Future: send user data to backend
        alert("Profile saved!");
        console.log(user);
    };

    return (
        <>
            <Navbar />
            <main className="px-6 py-16 max-w-5xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
                    <User className="w-8 h-8 text-green-600" />
                    My Profile
                </h1>

                {/* User Info */}
                <div className="bg-white shadow rounded-lg p-6 mb-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Save Changes
                    </button>
                </div>

                {/* Orders */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                        Order History
                    </h2>

                    {user.orders.length === 0 ? (
                        <p className="text-gray-600">No orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {user.orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                                >
                                    <div>
                                        <p className="font-medium">Order #{order.id}</p>
                                        <p className="text-sm text-gray-500">{order.status}</p>
                                    </div>
                                    <p className="font-semibold text-green-600">
                                        R{order.total.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
