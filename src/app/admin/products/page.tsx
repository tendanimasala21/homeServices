'use client'
import { useEffect, useState } from 'react'
import { AddProducts } from "@/features/products/add-products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PenIcon, TrashIcon } from "lucide-react"
import Loading from './loading'
import Image from "next/image"

interface Product {
    id: number
    name: string
    price: number
    category: string
    imageUrl: string
}

type ProductResponse = {
    id: number
    name: string
    price: string | number
    category: string
    imageUrl: string
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data: ProductResponse[] = await response.json()

            // Convert API response to Product[]
            const formatted = data.map((product) => ({
                ...product,
                price: Number(product.price)
            }))

            setProducts(formatted)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleAddProduct = (newProduct: Product) => {
        setProducts(prev => [...prev, newProduct])
    }

    if (loading) return <Loading />
    if (error)
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                Error: {error}
            </div>
        )

    return (
        <div className="flex flex-col w-full h-full p-5 space-y-5">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl">Products</h1>
                    <p className="text-xs text-muted-foreground">
                        Manage Products
                    </p>
                </div>
                <AddProducts onAdd={handleAddProduct} />
            </header>

            <main className="flex-auto w-full border rounded bg-card text-card-foreground p-4 overflow-x-auto">
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No products available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg bg-white shadow hover:shadow-lg transition"
                            >
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={500}
                                    height={300}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />

                                <div className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-semibold text-sm">{product.name}</h2>
                                        <Badge variant="outline">{product.category}</Badge>
                                    </div>

                                    <p className="font-small">R {product.price.toFixed(2)}</p>

                                    <div className="flex space-x-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs"
                                            onClick={() => alert(`Edit ${product.name}`)}
                                        >
                                            <PenIcon />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="text-xs"
                                            onClick={() => alert(`Delete ${product.name}`)}
                                        >
                                            <TrashIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
