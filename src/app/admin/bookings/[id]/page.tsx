import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const mockBookings = [
  {
    id: "BKG-001",
    customer: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "0124538920",
      address: "101 High Road, Edenvale",
    },
    service: "Kitchen Renovation",
    date: new Date("2025-08-10"),
    status: "Confirmed",
  },
  {
    id: "BKG-002",
    customer: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "0765483920",
      address: "55 Main Street, Sandton",
    },
    service: "Bathroom Tiling",
    date: new Date("2025-08-15"),
    status: "Pending",
  },
]

interface BookingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BookingDetailsPage({ params }: BookingPageProps) {
  const { id } = await params
  const booking = mockBookings.find((b) => b.id === id)

  if (!booking) return notFound()

  return (
    <div className="flex flex-col w-full h-full p-5 space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Booking Details</h1>
          <p className="text-xs text-muted-foreground">Full breakdown of customer booking</p>
        </div>
        <Badge variant="outline">{booking.status}</Badge>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded shadow">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Customer Info</h2>
          <div>
            <Label>Full Name</Label>
            <Input value={booking.customer.fullName} readOnly />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={booking.customer.email} readOnly />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={booking.customer.phone} readOnly />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={booking.customer.address} readOnly />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Booking Info</h2>
          <div>
            <Label>Service</Label>
            <Input value={booking.service} readOnly />
          </div>
          <div>
            <Label>Date</Label>
            <Input value={booking.date.toDateString()} readOnly />
          </div>
          <div>
            <Label>Status</Label>
            <Select defaultValue={booking.status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4">
            <Button>Update Status</Button>
          </div>
        </section>
      </main>
    </div>
  )
}