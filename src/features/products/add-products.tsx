'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, UploadIcon, XIcon } from 'lucide-react'
import { useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'

interface AddProductsProps {
  onAdd: (product: Product) => void
}

export function AddProducts({ onAdd }: AddProductsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (previewImages.length === 0) return []

    const formData = new FormData()

    const files = await Promise.all(
      previewImages.map(async (preview, index) => {
        const res = await fetch(preview)
        const blob = await res.blob()
        return new File([blob], `image-${Date.now()}-${index}.jpg`, {
          type: blob.type,
        })
      })
    )

    files.forEach((file) => formData.append('files', file))

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Image upload failed')
    }

    const data = await response.json()
    return data.urls ?? []
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const imageUrls = await uploadImages()
      const formData = new FormData(e.currentTarget)

      const payload = {
        name: formData.get('productName') as string,
        price: Number(formData.get('price')),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        imageUrl: imageUrls[0] || '/images/default-product.jpg',
        additionalImages: imageUrls.slice(1),
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to add product')

      const apiProduct = await response.json()

      // ✅ Normalize API response to shared Product type
      const newProduct: Product = {
        ...apiProduct,
        id: Number(apiProduct.id),
        price: Number(apiProduct.price),
      }

      onAdd(newProduct)

      setPreviewImages([])
      setIsOpen(false)
      e.currentTarget.reset()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add a Product</DialogTitle>
          <DialogDescription>
            Upload product images and details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images */}
            <div>
              <Label>Product Images</Label>
              <div
                className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {previewImages.map((img, i) => (
                    <div key={i} className="relative">
                      <Image
                        src={img}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <XIcon className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <Input name="productName" placeholder="Product name" required />
              <Input name="price" type="number" step="0.01" min="0" required />
              <Input name="category" placeholder="Category" required />
              <Input name="description" placeholder="Description" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing…' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
