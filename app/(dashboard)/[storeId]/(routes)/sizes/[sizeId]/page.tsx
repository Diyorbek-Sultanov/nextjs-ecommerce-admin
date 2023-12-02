import SizeForm from './_components/size-form'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'

const SizeIdPage = async ({ params }: { params: { sizeId: string } }) => {
	const size = await db.size.findUnique({
		where: {
			id: params.sizeId,
		},
	})

	if (size === null && params.sizeId !== 'new') {
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
					<div className='pt-10 flex items-center gap-8'>
						<div>
							<Skeleton className='h-4 w-16 mb-3' />
							<Skeleton className='h-8 w-52' />
						</div>
						<div>
							<Skeleton className='h-4 w-16 mb-3' />
							<Skeleton className='h-8 w-52' />
						</div>
					</div>
					<Skeleton className='h-10 w-36' />
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeForm initialData={size} />
			</div>
		</div>
	)
}

export default SizeIdPage
