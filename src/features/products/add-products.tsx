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

interface AddProductsProps {
    onAdd: (product: any) => void
}

export function AddProducts({ onAdd }: AddProductsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [_uploadedImages, setUploadedImages] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const newPreviews: string[] = []
            
            files.forEach(file => {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        newPreviews.push(reader.result as string)
                        if (newPreviews.length === files.length) {
                            setPreviewImages(prev => [...prev, ...newPreviews])
                        }
                    }
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const handleRemoveImage = (index: number) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index))
        // Also remove from uploaded images if already uploaded
        setUploadedImages(prev => prev.filter((_, i) => i !== index))
    }

    const uploadImages = async () => {
        if (previewImages.length === 0) return []

        try {
            setUploadProgress(0)
            const formData = new FormData()
            
            // Convert preview images back to files
            const files = await Promise.all(
                previewImages.map(async (preview) => {
                    const response = await fetch(preview)
                    const blob = await response.blob()
                    return new File([blob], `image-${Date.now()}.jpg`, { type: 'image/jpeg' })
                })
            )

            files.forEach(file => {
                formData.append('files', file)
            })

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Image upload failed')
            }

            const data = await response.json()
            setUploadedImages(data.urls)
            return data.urls
        } catch (error) {
            console.error('Upload error:', error)
            throw error
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // First upload images
            const imageUrls = await uploadImages()
            
            // Then submit product data
            const formData = new FormData(e.currentTarget);
            const productData = {
                name: formData.get('productName') as string,
                price: parseFloat(formData.get('price') as string),
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                imageUrl: imageUrls[0] || '/images/default-product.jpg',
                additionalImages: imageUrls.slice(1)
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            })

            if (!response.ok) {
                throw new Error('Failed to add product')
            }

            const newProduct = await response.json()
            onAdd(newProduct)
            
            // Reset form
            setPreviewImages([])
            setUploadedImages([])
            setIsOpen(false)
            e.currentTarget.reset()
        } catch (error) {
            console.error('Error:', error)
            alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`)
        } finally {
            setIsLoading(false)
            setUploadProgress(0)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button><PlusIcon className="mr-2 h-4 w-4" /> Add Product</Button>
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
                        {/* Left Column - Images */}
                        <div>
                            <Label>Product Images</Label>
                            <div className="mt-2 space-y-4">
                                {/* Image upload area */}
                                <div 
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG up to 5MB
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* Image previews */}
                                {previewImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {previewImages.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index}`}
                                                    className="h-24 w-full object-cover rounded-md"
                                                    width={500}
                                                    height={500}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <XIcon className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Upload progress */}
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-primary h-2.5 rounded-full" 
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Form fields */}
                        <div className="space-y-4">
                            <div>
                                <Label>Product Name *</Label>
                                <Input 
                                    name="productName" 
                                    placeholder="Enter product name" 
                                    required
                                />
                            </div>

                            <div>
                                <Label>Price *</Label>
                                <Input 
                                    name="price" 
                                    type="number" 
                                    placeholder="Enter price" 
                                    required
                                    step="0.01"
                                    min="0"
                                />
                            </div>

                            <div>
                                <Label>Category *</Label>
                                <Input 
                                    name="category" 
                                    placeholder="Enter category" 
                                    required
                                />
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Input 
                                    name="description" 
                                    placeholder="Product description" 
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}