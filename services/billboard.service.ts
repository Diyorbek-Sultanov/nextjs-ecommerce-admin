import type { TBilboardSchema } from '@/lib/zod-validation/billboard'
import type { Billboard } from '@prisma/client'
import axios from 'axios'

class billboardService {
	async getBillboards(storeId: string) {
		return axios.get<Billboard[]>(`/api/${storeId}/billboards`)
	}

	async createBillboard(data: TBilboardSchema, storeId: string) {
		return axios.post(`/api/${storeId}/billboards`, data)
	}

	async updateBillboard(
		data: TBilboardSchema,
		billboardId: string,
		storeId: string
	) {
		return axios.patch(`/api/${storeId}/billboards/${billboardId}`, data)
	}

	async deleteBillboard(storeId: string, billboardId: string) {
		return axios.delete(`/api/${storeId}/billboards/${billboardId}`)
	}
}

export const BillboardService = new billboardService()
