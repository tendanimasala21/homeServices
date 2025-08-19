import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  contact: varchar('contact', { length: 20 }).notNull(),
  hash: text('hash').notNull(),
  role: text('role').default('user').notNull(),
})

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: numeric('price').notNull(),
  category: text('category'), // optional
  imageUrl: text('image_url'), // optional
})

export const serviceBookings = pgTable('service_bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  bookingDate: timestamp('booking_date', { mode: 'date' }).notNull(),
  status: text('status').notNull(), // e.g., pending, confirmed, cancelled
  notes: text('notes'),
})

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: numeric('price').notNull(),
  stockQuantity: integer('stock_quantity'), // optional
  imageUrl: text('image_url'), // Supabase Storage
  isActive: boolean('is_active').default(true),
})

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  totalPrice: numeric('total_price').notNull(),
  status: text('status').notNull(), // pending, shipped, cancelled
  createdAt: timestamp('created_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price').notNull(),
})