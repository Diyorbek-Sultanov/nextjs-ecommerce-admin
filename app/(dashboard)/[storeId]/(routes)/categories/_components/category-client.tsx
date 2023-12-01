'use client'

import { format } from 'date-fns'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Category } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { columns, type CategoryColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'

const CategoryClient: React.FC<{ data: CategoryColumns[] }> = ({ data }) => {
	const params = useParams()

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Categories ${data.length}`}
					description='Manage categories for your store'
				/>
				<Button asChild>
					<Link href={`/${params.storeId}/categories/new`}>
						<PlusCircle className='mr-2 h-4 w-4' />
						Add new
					</Link>
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='label' />
			<Separator />
			<ApiList entityName='categories' entityIdName='categoryId' />
		</>
	)
}

export default CategoryClient
