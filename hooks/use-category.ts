import {
	CREATECATEGORY,
	DELETECATEGORY,
	UPDATECATEGORY,
} from '@/constants/query-keys'
import { TCategorySchema } from '@/lib/zod-validation/category'
import { CategoryService } from '@/services/category.service'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useCategory = (categoryId?: string) => {
	const router = useRouter()
	const params = useParams()

	const { mutate: createMutate, isPending: createLoading } = useMutation({
		mutationKey: [CREATECATEGORY],
		mutationFn: (data: TCategorySchema) =>
			CategoryService.createCategory(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Category success created')
			router.refresh()
			router.push(`/${params.storeId}/categories`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATECATEGORY],
		mutationFn: (data: TCategorySchema) =>
			CategoryService.updateCategory(
				data,
				params.storeId as string,
				params.categoryId as string
			),
		onSuccess: () => {
			toast.success('Category success updated')
			router.refresh()
			router.push(`/${params.storeId}/categories`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETECATEGORY],
		mutationFn: () =>
			CategoryService.deleteCategory(
				params.storeId as string,
				categoryId as string
			),
		onSuccess: () => {
			toast.success('Category success deleted')
			router.refresh()
			router.push(`/${params.storeId}/categories`)
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

export { useCategory }
