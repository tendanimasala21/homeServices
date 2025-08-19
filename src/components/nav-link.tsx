'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type Props = {
	href: string
	exact?: boolean
	children: React.ReactNode
}

export function NavLink(props: Props) {
	const pathname = usePathname()

	const active = useMemo(
		() =>
			props.exact ? pathname === props.href : pathname.startsWith(props.href),
		[props, pathname]
	)

	return (
		<Button
			asChild
			variant="ghost"
			size="lg"
			className={cn('w-full justify-start font-light', {
				'bg-purple-500 text-white': active,
			})}
		>
			<Link href={props.href}>{props.children}</Link>
		</Button>
	)
}
