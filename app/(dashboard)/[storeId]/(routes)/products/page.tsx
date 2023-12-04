import { db } from '@/lib/db'
import ProductClient from './_components/product-client'
import { format } from 'date-fns'
import type { ProductColumns } from './_components/columns'
import { formatPrice } from '@/lib/utils'

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
	const products = await db.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			color: true,
			size: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedData: ProductColumns[] = products.map((item) => ({
		id: item.id,
		label: item.name,
		isFeatured: item.isFeatured,
		isArchived: item.isArchived,
		price: formatPrice(item.price.toNumber()),
		category: item.category.name,
		size: item.size.name,
		color: item.color.value,
		createdAt: format(item.createdAt, 'MMM, do, yyyy, hh:mm'),
	}))

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductClient data={formattedData} />
			</div>
		</div>
	)
}

export default ProductPage
