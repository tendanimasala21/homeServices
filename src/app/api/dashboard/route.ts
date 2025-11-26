// app/api/dashboard/route.ts
import { db } from '@/db/client'
import { orders, users } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ordersData = await db.select().from(orders)
    const usersData = await db.select().from(users)
    
    const recentOrders = await db
      .select({
        id: orders.id,
        status: orders.status,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(3)

    return NextResponse.json({
      ordersCount: ordersData.length,
      revenue: ordersData.reduce((sum, order) => sum + Number(order.totalPrice), 0),
      customersCount: usersData.length,
      recentOrders
    })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
