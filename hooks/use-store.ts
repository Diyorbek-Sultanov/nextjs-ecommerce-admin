import { DELETESTORE, UPDATESTORE } from '@/constants/query-keys'
import type { TStoreSchema } from '@/lib/zod-validation/store'
import { StoreService } from '@/services/store.service'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useStore = () => {
	const router = useRouter()
	const params = useParams()

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATESTORE],
		mutationFn: (data: TStoreSchema) =>
			StoreService.updateStore(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Store success updated')
			router.refresh()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETESTORE],
		mutationFn: () => StoreService.deleteStore(params.storeId as string),
		onSuccess: () => {
			toast.success('Store success deleted')
			router.refresh()
			router.push('/')
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
	}
}

export { useStore }
