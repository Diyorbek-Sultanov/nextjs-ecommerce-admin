import { db } from '@/lib/db'
import BillboardClient from './_components/billboard-client'

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
	const billboards = await db.billboard.findMany({
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
				<BillboardClient data={billboards} />
			</div>
		</div>
	)
}

export default BillboardPage
