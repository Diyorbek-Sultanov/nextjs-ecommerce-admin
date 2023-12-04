'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NavRoutes: React.FC = () => {
	const pathname = usePathname()
	const params = useParams()

	const routes = [
		{
			href: `/${params.storeId}`,
			label: 'Overview',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${params.storeId}/categories`,
		},
		{
			href: `/${params.storeId}/sizes`,
			label: 'Sizes',
			active: pathname === `/${params.storeId}/sizes`,
		},
		{
			href: `/${params.storeId}/colors`,
			label: 'Colors',
			active: pathname === `/${params.storeId}/colors`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`,
		},
	]

	return (
		<nav className='flex items-center space-x-4 lg:space-x-6 mx-6'>
			{routes.map((route) => (
				<Link
					href={route.href}
					key={route.label}
					className={cn(
						'text-sm font-medium hover:text-primary transition-colors',
						route.active ? 'text-black' : 'text-muted-foreground'
					)}>
					{route.label}
				</Link>
			))}
		</nav>
	)
}

export default NavRoutes
