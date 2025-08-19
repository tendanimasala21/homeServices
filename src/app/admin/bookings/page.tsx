import { BookingActions } from "@/features/bookings/booking-actions"

const mockBookings = [
  {
    id: "BKG-001",
    customer: "John Doe",
    service: "Kitchen Renovation",
    date: new Date("2025-08-10"),
    status: "Confirmed",
  },
  {
    id: "BKG-002",
    customer: "Jane Smith",
    service: "Bathroom Tiling",
    date: new Date("2025-08-15"),
    status: "Pending",
  },
  {
    id: "BKG-003",
    customer: "Mark Johnson",
    service: "Bedroom Cupboards",
    date: new Date("2025-08-20"),
    status: "Cancelled",
  },
]

export default function Bookings() {
  return (
    <div className="flex flex-col w-full h-full p-5 space-y-5">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-xl">Bookings</h1>
          <p className="text-xs text-muted-foreground">
            Manage customer bookings
          </p>
        </div>
      </header>

      <main className="flex-auto w-full border rounded bg-card text-card-foreground p-4 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium">Booking ID</th>
              <th className="py-2 px-4 font-medium">Customer</th>
              <th className="py-2 px-4 font-medium">Service</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.customer}</td>
                <td className="py-3 px-4">{booking.service}</td>
                <td className="py-3 px-4">{booking.date.toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className="capitalize">{booking.status}</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <BookingActions booking={booking} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
