'use client'

import { format } from 'date-fns'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Billboard } from '@prisma/client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { columns, type ProductColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'

const ProductClient: React.FC<{ data: ProductColumns[] }> = ({ data }) => {
	const params = useParams()

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Products ${data.length}`}
					description='Manage products for your store'
				/>
				<Button asChild>
					<Link href={`/${params.storeId}/products/new`}>
						<PlusCircle className='mr-2 h-4 w-4' />
						Add new
					</Link>
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='label' />
			<Heading title='API' description='API calls for Products' />
			<Separator />
			<ApiList entityName='products' entityIdName='productId' />
		</>
	)
}

export default ProductClient
