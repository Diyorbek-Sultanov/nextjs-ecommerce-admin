import { CREATESIZE, DELETESIZE, UPDATEDSIZE } from '@/constants/query-keys'
import type { TSizeSchema } from '@/lib/zod-validation/size'
import { SizeService } from '@/services/size.service'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useSize = () => {
	const router = useRouter()
	const params = useParams()

	const { mutate: createMutate, isPending: createLoading } = useMutation({
		mutationKey: [CREATESIZE],
		mutationFn: (data: TSizeSchema) =>
			SizeService.createSize(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Size success created')
			router.push(`/${params.storeId}/sizes`)
			router.refresh()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATEDSIZE],
		mutationFn: (data: TSizeSchema) =>
			SizeService.updateSize(
				data,
				params.storeId as string,
				params.sizeId as string
			),
		onSuccess: () => {
			toast.success('Size success updated')
			router.push(`/${params.storeId}/sizes`)
			router.refresh()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETESIZE],
		mutationFn: () =>
			SizeService.deletSize(params.storeId as string, params.size as string),
		onSuccess: () => {
			toast.success('Size success deleted')
			router.push(`/${params.storeId}/Size`)
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

export { useSize }
