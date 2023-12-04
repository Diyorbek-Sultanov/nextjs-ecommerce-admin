import { db } from '@/lib/db'
import ColorsClient from './_components/color-client'

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	const colors = await db.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorsClient data={colors} />
			</div>
		</div>
	)
}

export default ColorsPage
