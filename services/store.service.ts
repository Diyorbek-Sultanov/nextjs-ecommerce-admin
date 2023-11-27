import type { TStoreSchema } from '@/lib/zod-validation/store'
import { Store } from '@prisma/client'
import axios from 'axios'

class storeService {
	async createStore(data: TStoreSchema): Promise<Store> {
		const response = await axios.post<Store>('/api/stores', data)

		return response.data
	}

	async updateStore(data: TStoreSchema, id: string) {
		return await axios.patch(`/api/stores/${id}`, data)
	}

	async deleteStore(id: string) {
		return await axios.delete(`/api/stores/${id}`)
	}
}

export const StoreService = new storeService()
