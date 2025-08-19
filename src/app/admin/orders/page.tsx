'use client'

import { Order, OrderTable } from '@/features/Orders/orders-table'
import { useState } from 'react'
// import { OrderTable, Order } from '@/features/orders/order-table'

const initialOrders: Order[] = [
  // Your mock or fetched orders go here
  {
    id: 'ORD-001',
    customer: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "0124538920",
      address: "101 High Road, Edenvale"
    },
    date: new Date(),
    total: 1299.99,
    status: 'Completed',
    items: [
      { productName: "Gaming Laptop", quantity: 1 },
      { productName: "Wireless Mouse", quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    customer: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "0789012345",
      address: "55 Rose Street, Cape Town"
    },
    date: new Date(),
    total: 259.0,
    status: 'Processing',
    items: [
      { productName: "Bluetooth Speaker", quantity: 1 }
    ]
  },
  {
    id: 'ORD-003',
    customer: {
      fullName: "Mike Johnson",
      email: "mike.j@example.com",
      phone: "0834567890",
      address: "44 Palm Avenue, Durban"
    },
    date: new Date(),
    total: 79.99,
    status: 'Pending',
    items: [
      { productName: "Phone Charger", quantity: 2 }
    ]
  },
  {
    id: 'ORD-004',
    customer: {
      fullName: "Alice Brown",
      email: "aliceb@example.com",
      phone: "0723456789",
      address: "10 Green Lane, Pretoria"
    },
    date: new Date(),
    total: 560.5,
    status: 'Cancelled',
    items: [
      { productName: "Desk Lamp", quantity: 1 },
      { productName: "Notebook Set", quantity: 3 }
    ]
  }
]

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)

  const handleStatusChange = (id: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    )
  }

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-5">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage customer orders</p>
        </div>
      </header>

      <main className="w-full border rounded-lg bg-card p-4 overflow-auto">
        <OrderTable orders={orders} onStatusChange={handleStatusChange} />
      </main>
    </div>
  )
}