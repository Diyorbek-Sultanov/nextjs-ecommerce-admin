import { TSizeSchema } from '@/lib/zod-validation/size'
import axios from 'axios'

class sizeService {
	async createSize(data: TSizeSchema, storeId: string) {
		return await axios.post(`/api/${storeId}/sizes`, data)
	}

	async updateSize(data: TSizeSchema, storeId: string, sizeId: string) {
		return await axios.patch(`/api/${storeId}/sizes/${sizeId}`, data)
	}

	async deletSize(storeId: string, sizeId: string) {
		return await axios.delete(`/api/${storeId}/sizes/${sizeId}`)
	}
}

export const SizeService = new sizeService()
