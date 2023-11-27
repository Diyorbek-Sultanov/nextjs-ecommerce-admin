import { UserButton, auth } from '@clerk/nextjs'
import NavRoutes from './NavRoutes'
import StoreSwitcher from './store-switcher'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const Navbar: React.FC = async () => {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const store = await db.store.findMany({
		where: {
			userId,
		},
	})

	return (
		<header className='border-b'>
			<div className='flex items-center h-16 px-4'>
				<StoreSwitcher items={store} />
				<NavRoutes />
				<div className='ml-auto flex items-center space-x-4'>
					<UserButton afterSignOutUrl='/' />
				</div>
			</div>
		</header>
	)
}

export default Navbar
