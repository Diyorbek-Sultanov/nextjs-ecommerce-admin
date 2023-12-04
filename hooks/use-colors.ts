import { CREATECOLOR, DELETECOLOR, UPDATECOLOR } from '@/constants/query-keys'
import type { TColorSchema } from '@/lib/zod-validation/color'
import { ColorService } from '@/services/color.service'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useColors = (colorId?: string) => {
	const router = useRouter()
	const params = useParams()

	const { mutate: createMutate, isPending: createLoading } = useMutation({
		mutationKey: [CREATECOLOR],
		mutationFn: (data: TColorSchema) =>
			ColorService.createColor(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Color success created')
			router.push(`/${params.storeId}/colors`)
			router.refresh()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATECOLOR],
		mutationFn: (data: TColorSchema) =>
			ColorService.updateColor(
				data,
				params.storeId as string,
				params.colorId as string
			),
		onSuccess: () => {
			toast.success('Color success updated')
			router.push(`/${params.storeId}/colors`)
			router.refresh()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETECOLOR],
		mutationFn: () =>
			ColorService.deleteColor(params.storeId as string, colorId!),
		onSuccess: () => {
			toast.success('Color success deleted')
			router.push(`/${params.storeId}/colors`)
			router.refresh()
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

export { useColors }
