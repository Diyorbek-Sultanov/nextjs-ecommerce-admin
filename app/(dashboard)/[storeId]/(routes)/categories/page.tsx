import { db } from '@/lib/db'
import CategoryClient from './_components/category-client'
import { CategoryColumns } from './_components/columns'
import { format } from 'date-fns'

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
	const categories = await db.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedData: CategoryColumns[] = categories.map((item) => ({
		id: item.id,
		label: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMM, do, yyyy, hh:mm'),
	}))

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoryClient data={formattedData} />
			</div>
		</div>
	)
}

export default CategoryPage
