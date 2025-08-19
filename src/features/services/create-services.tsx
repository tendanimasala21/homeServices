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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { PlusIcon } from 'lucide-react'

// Replace with your actual service categories from backend if needed
const serviceCategories = ['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Other']

export async function CreateServices() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button><PlusIcon/> Add Service</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Service</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a new service.
					</DialogDescription>
				</DialogHeader>

				<form className="space-y-8 md:p-4 p-2 max-w-lg">
					{/* Service Name */}
					<div>
						<Label>Service Name</Label>
						<Input name="name" placeholder="Enter service name" />
					</div>

					{/* Price */}
					{/* <div>
						<Label>Price</Label>
						<Input name="price" type="number" placeholder="Enter price" />
					</div> */}

					{/* Category Dropdown */}
					<div className="space-y-2">
						<Label>Category</Label>
						<Select name="category">
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{serviceCategories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Description */}
					<div>
						<Label>Description</Label>
						<Input name="description" placeholder="Brief description of the service" />
					</div>

					{/* Images */}
					<div>
						<p className="text-base font-medium">Service Images</p>
						<div className="flex flex-wrap items-center gap-3 mt-2">
							{[1, 2, 3].map((item) => (
								<label
									key={item}
									className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition"
								>
									<input type="file" name={`image${item}`} className="hidden" />
									<span className="text-gray-500 text-sm text-center">
										Upload<br />Image {item}
									</span>
								</label>
							))}
						</div>
					</div>

					<DialogFooter className="flex">
						<Button type="submit" className="flex-auto">
							Add Service
						</Button>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
