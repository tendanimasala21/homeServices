'use client'

import { Button } from '@/components/ui/button'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { ViewOrderDialog } from './view-order'

interface OrderItem {
    productName: string
    quantity: number
}

interface CustomerInfo {
    fullName: string
    email: string
    phone: string
    address: string
}

export interface Order {
    id: string
    date: Date
    items: OrderItem[]
    customer: CustomerInfo
    total: number
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'
}

interface Props {
    orders: Order[]
    onStatusChange: (id: string, newStatus: Order['status']) => void
}

export function OrderTable({ orders, onStatusChange }: Props) {
    // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    return (
        <>
            <table className="min-w-full text-sm text-left">
                <thead className="bg-muted">
                    <tr className="text-muted-foreground">
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/40 transition">
                            <td className="px-4 py-2 font-medium">{order.id}</td>
                            <td className="px-4 py-2">{order.customer.fullName}</td>
                            <td className="px-4 py-2">{format(order.date, 'PPP')}</td>
                            <td className="px-4 py-2">R {order.total.toFixed(2)}</td>
                            <td className="px-4 py-2">
                                <span className={`text-xs font-semibold rounded px-2 py-1 ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                                <ViewOrderDialog
                                    order={order}
                                    onStatusChange={onStatusChange}
                                >
                                    <Button variant="ghost" size="icon">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </ViewOrderDialog>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
