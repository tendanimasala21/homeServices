import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { getServices } from '@/features/services/actions'
import { CreateServices } from '@/features/services/create-services'

export default async function Services() {
	const services = await getServices()

	return (
		<div className="flex flex-col w-full h-full p-5 space-y-5">
			<header className="flex justify-between items-center">
				<div>
					<h1 className="text-xl">Services</h1>
					<p className="text-xs text-muted-foreground">Manage Services</p>
				</div>
				<CreateServices />
			</header>

			<main className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
				{services.map((service) => (
					<Link key={service.id} href={`/admin/services/${service.id}`}>
						<div className="flex flex-col h-full col-span-1 duration-500 border divide-y bg-card text-card-foreground hover:bg-primary/5 rounded">
							{/* Image */}
							{service.image ? (
								<img
									src={service.image}
									alt={service.name}
									className="w-full aspect-video object-cover rounded-t"
								/>
							) : (
								<div className="w-full aspect-video bg-muted flex items-center justify-center text-xs text-muted-foreground rounded-t">
									No image
								</div>
							)}

							{/* Content */}
							<div className="p-5 space-y-5">
								<header className="flex items-center justify-between space-x-2">
									<h2 className="text-xl font-medium line-clamp-1">{service.name}</h2>
									{service.category && (
										<Badge variant="outline">{service.category}</Badge>
									)}
								</header>
								<p className="text-xs line-clamp-3 text-muted-foreground">
									{service.description}
								</p>
							</div>
						</div>
					</Link>
				))}
			</main>
		</div>
	)
}
