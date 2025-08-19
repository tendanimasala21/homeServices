'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ReactNode, useState } from 'react'
import { Order } from './orders-table'

interface Props {
  order: Order
  children: ReactNode
  onStatusChange: (id: string, newStatus: Order['status']) => void
}

export function ViewOrderDialog({ order, children, onStatusChange }: Props) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(order.status)

  const handleStatusChange = (newStatus: Order['status']) => {
    setStatus(newStatus)
    onStatusChange(order.id, newStatus)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <Label className="text-muted-foreground">Customer Info</Label>
            <div className="pl-2 mt-1 space-y-1">
              <p><strong>Name:</strong> {order.customer.fullName}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground">Items Ordered</Label>
            <ul className="pl-4 list-disc mt-1">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.productName} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Label className="text-muted-foreground">Change Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
