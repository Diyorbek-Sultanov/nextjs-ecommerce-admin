import {
	CREATEBILLBOARD,
	DELETEBILLBOARD,
	GETSINGLEBILLBOARD,
	UPDATEBILLBOARD,
} from '@/constants/query-keys'
import { TBilboardSchema } from '@/lib/zod-validation/billboard'
import { BillboardService } from '@/services/billboard.service'
import { StoreService } from '@/services/store.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useBillboard = () => {
	const router = useRouter()
	const params = useParams()

	const { data: billboard, isPending: isLoading } = useQuery({
		queryKey: [GETSINGLEBILLBOARD],
		queryFn: () =>
			BillboardService.getBillboardById(
				params.billboardId as string,
				params.storeId as string
			),
		select: ({ data }) => data,
		enabled: !!params.billboardId,
	})

	const { mutate: createMutate, isPending: createLoading } = useMutation({
		mutationKey: [CREATEBILLBOARD],
		mutationFn: (data: TBilboardSchema) =>
			BillboardService.createBillboard(data, params.storeId as string),
		onSuccess: () => {
			toast.success('Billboard success created')
			router.refresh()
			router.push(`/${params.storeId}/billboards`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: updateMutate, isPending: updateLoading } = useMutation({
		mutationKey: [UPDATEBILLBOARD],
		mutationFn: (data: TBilboardSchema) =>
			BillboardService.updateBillboard(
				data,
				params.billboardId as string,
				params.storeId as string
			),
		onSuccess: () => {
			toast.success('Billboard success updated')
			router.refresh()
			router.push(`/${params.storeId}/billboards`)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
		mutationKey: [DELETEBILLBOARD],
		mutationFn: () =>
			BillboardService.deleteBillboard(
				params.storeId as string,
				params.billboardId as string
			),
		onSuccess: () => {
			toast.success('Billboard success deleted')
			router.refresh()
			router.push(`/${params.storeId}/billboards`)
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
		billboard,
		isLoading,
	}
}

export { useBillboard }
