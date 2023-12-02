import { db } from '@/lib/db'
import SizeClient from './_components/size-client'

const Sizespage = async ({ params }: { params: { storeId: string } }) => {
	const sizes = await db.size.findMany({
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
				<SizeClient data={sizes} />
			</div>
		</div>
	)
}

export default Sizespage
