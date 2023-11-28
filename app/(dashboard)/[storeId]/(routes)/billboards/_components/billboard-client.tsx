'use client'

import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const BillboardClient: React.FC = () => {
	const params = useParams()

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Billboards (0)'
					description='Manage billboards for your store'
				/>
				<Button asChild>
					<Link href={`/${params.storeId}/billboards/new`}>
						<PlusCircle className='mr-2 h-4 w-4' />
						Add new
					</Link>
				</Button>
			</div>
			<Separator />
		</>
	)
}

export default BillboardClient
