import type { TStoreSchema } from '@/lib/zod-validation/store'
import { Store } from '@prisma/client'
import axios from 'axios'

class storeService {
	async createStore(data: TStoreSchema): Promise<Store> {
		const response = await axios.post<Store>('/api/stores', data)

		return response.data
	}
}

export const StoreService = new storeService()
