'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ShoppingCart, Users, DollarSign } from 'lucide-react'
import Loading from './loading'

type DashboardData = {
  ordersCount: number
  revenue: number
  customersCount: number
  recentOrders: Array<{
    id: string
    status: string
  }>
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />
  if (error) return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>
  if (!data) return <div className="flex items-center justify-center h-full">No data available</div>

  return (
    <motion.div
      className="grid w-full h-full grid-cols-3 grid-rows-6 gap-5 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Orders */}
      <motion.div className="row-span-1 col-span-1" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Orders</CardTitle>
            <ShoppingCart className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.ordersCount}</p>
            <p className="text-sm text-white/70">Live total orders</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue */}
      <motion.div className="row-span-1 col-span-1" whileHover={{ scale: 1.02 }}>
        <Card className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <DollarSign className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R{data.revenue.toLocaleString()}</p>
            <p className="text-sm text-white/70">This month's revenue</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customers */}
      <motion.div className="row-span-1 col-span-1" whileHover={{ scale: 1.02 }}>
        <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Customers</CardTitle>
            <Users className="w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.customersCount}</p>
            <p className="text-sm text-white/70">Registered customers</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sales Overview Chart Placeholder */}
      <motion.div className="row-span-3 col-span-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="shadow">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            <p>[ Chart Component Placeholder ]</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div className="row-span-3 col-span-1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {data.recentOrders.length > 0 ? data.recentOrders.map((order) => (
                <li key={order.id} className="flex justify-between">
                  <span>{order.id.slice(0, 8)}...</span>
                  <span className={`capitalize ${
                    order.status === 'shipped' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {order.status}
                  </span>
                </li>
              )) : <p>No recent orders</p>}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Overview */}
      <motion.div className="row-span-2 col-span-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <Card className="shadow bg-muted">
          <CardHeader>
            <CardTitle className="text-base">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-sm text-muted-foreground">
            <p>Last Backup: 2 hours ago</p>
            <p>System Health: <span className="text-green-600">All systems operational</span></p>
            <p>Upcoming Tasks: 5</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}