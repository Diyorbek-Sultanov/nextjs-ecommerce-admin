'use client'

import { format } from 'date-fns'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Billboard } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { columns, type BillboardColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'

const BillboardClient: React.FC<{ data: Billboard[] }> = ({ data }) => {
	const params = useParams()

	const formattedData: BillboardColumns[] = data.map((item) => ({
		id: item.id,
		label: item.label,
		image: item.imageUrl,
		createdAt: format(item.createdAt, 'MMM, do, yyyy, hh:mm'),
	}))

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Billboards ${data.length}`}
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
			<DataTable columns={columns} data={formattedData} searchKey='label' />
		</>
	)
}

export default BillboardClient
