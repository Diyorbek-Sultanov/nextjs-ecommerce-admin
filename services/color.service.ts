import { TColorSchema } from '@/lib/zod-validation/color'
import axios from 'axios'

class colorService {
	async createColor(data: TColorSchema, storeId: string) {
		return await axios.post(`/api/${storeId}/colors`, data)
	}

	async updateColor(data: TColorSchema, storeId: string, colorId: string) {
		return await axios.patch(`/api/${storeId}/colors/${colorId}`, data)
	}

	async deleteColor(storeId: string, colorId: string) {
		return await axios.delete(`/api/${storeId}/colors/${colorId}`)
	}
}

export const ColorService = new colorService()
