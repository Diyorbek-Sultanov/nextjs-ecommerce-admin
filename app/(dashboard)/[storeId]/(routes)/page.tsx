import { db } from '@/lib/db'

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
		},
	})

	return <div>{store?.name}</div>
}

export default DashboardPage
