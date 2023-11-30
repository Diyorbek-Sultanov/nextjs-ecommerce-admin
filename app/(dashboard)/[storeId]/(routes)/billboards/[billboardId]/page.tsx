import BillboardForm from './_components/billboard-form'
import { Skeleton } from '@/components/ui/skeleton'
import { BillboardService } from '@/services/billboard.service'
import { db } from '@/lib/db'

const BillboardIdPage = async ({
	params,
}: {
	params: { billboardId: string }
}) => {
	const billboard = await db.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	})

	if (!billboard && params.billboardId !== 'new') {
		return (
			<div className='flex flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<div className='flex md:flex-row flex-col justify-between gap-y-3 md:gap-y-0'>
						<div className='flex flex-col gap-y-3'>
							<Skeleton className='w-40 h-5' />
							<Skeleton className='w-32 h-4' />
						</div>
						<Skeleton className='w-10 h-10' />
					</div>
					<div className='space-y-8 mt-6'>
						<Skeleton className='h-4 w-16 mb-3' />
						<Skeleton className='h-[200px] w-[200px] mb-4' />
						<Skeleton className='h-10 w-36' />
						<div className='mt-8'>
							<Skeleton className='h-4 w-16 mb-3' />
							<Skeleton className='h-8 w-52 mb-5' />
							<Skeleton className='h-10 w-36' />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	)
}

export default BillboardIdPage
