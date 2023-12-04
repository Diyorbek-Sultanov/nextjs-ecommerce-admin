import {
	CREATEPRODUCT,
	DELETEPRODUCT,
	UPDATEPRODUCT,
} from '@/constants/query-keys'
import type { TProductSchema } from '@/lib/zod-validation/product'
import { ProductService } from '@/services/product.service'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useProduct = (productId?: string) => {
	const router = useRouter()
	const params = useParams()

	const { mutate: createMutate, isPending: createLoading } = useMutation({
		mutationKey: [CREATEPRODUCT],
		mutationFn: (data: TProductSchema) =>
			ProductService.createProduct(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Product success created')
			router.refresh()
			router.push(`/${params.storeId}/products`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATEPRODUCT],
		mutationFn: (data: TProductSchema) =>
			ProductService.updateProduct(
				data,
				params.storeId as string,
				params.productId as string
			),
		onSuccess: () => {
			toast.success('Product success updated')
			router.refresh()
			router.push(`/${params.storeId}/products`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETEPRODUCT],
		mutationFn: () =>
			ProductService.deleteProduct(
				params.storeId as string,
				productId as string
			),
		onSuccess: () => {
			toast.success('Product success deleted')
			router.refresh()
			router.push(`/${params.storeId}/products`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		deleteLoading,
		updateLoading,
		updateMutate,
		deleteMutate,
		createLoading,
		createMutate,
	}
}

export { useProduct }
