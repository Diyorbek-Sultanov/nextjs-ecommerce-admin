import ProductForm from './_components/product-form'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'

const BillboardIdPage = async ({
	params,
}: {
	params: { productId: string; storeId: string }
}) => {
	const product = await db.product.findUnique({
		where: {
			id: params.productId,
		},
		include: {
			images: true,
		},
	})

	const categories = await db.category.findMany({
		where: {
			storeId: params.storeId,
		},
	})

	const colors = await db.color.findMany({
		where: {
			storeId: params.storeId,
		},
	})

	const sizes = await db.size.findMany({
		where: {
			storeId: params.storeId,
		},
	})

	if (!product && params.productId !== 'new') {
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
				<ProductForm
					initialData={product}
					categories={categories}
					colors={colors}
					sizes={sizes}
				/>
			</div>
		</div>
	)
}

export default BillboardIdPage
