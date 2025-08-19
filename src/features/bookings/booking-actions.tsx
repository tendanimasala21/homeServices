"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

interface Booking {
  id: string
  customer: string
  service: string
  date: Date
  status: string
}

interface BookingActionsProps {
  booking: Booking
}

export function BookingActions({ booking }: BookingActionsProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/admin/bookings/${booking.id}`)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Edit status for ${booking.id}`)}>
          Edit Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Cancel ${booking.id}`)} className="text-red-600">
          Cancel Booking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
