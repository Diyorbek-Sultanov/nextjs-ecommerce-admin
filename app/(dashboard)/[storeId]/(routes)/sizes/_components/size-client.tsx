'use client'

import { format } from 'date-fns'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Size } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { columns, type SizesColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'

const SizeClient: React.FC<{ data: Size[] }> = ({ data }) => {
	const params = useParams()

	const formattedData: SizesColumns[] = data.map((item) => ({
		id: item.id,
		label: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMM, do, yyyy, hh:mm'),
	}))

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Sizes ${data.length}`}
					description='Manage sizes for your store'
				/>
				<Button asChild>
					<Link href={`/${params.storeId}/sizes/new`}>
						<PlusCircle className='mr-2 h-4 w-4' />
						Add new
					</Link>
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={formattedData} searchKey='label' />
			<Separator />
			<ApiList entityName='sizes' entityIdName='sizeId' />
		</>
	)
}

export default SizeClient
