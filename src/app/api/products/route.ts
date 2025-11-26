// app/api/products/route.ts
import { db } from '@/db/client'
import { products } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allProducts = await db.select().from(products)
    return NextResponse.json(allProducts)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct = await db.insert(products).values(body).returning()
    return NextResponse.json(newProduct[0], { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}