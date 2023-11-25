import type { TStoreSchema } from '@/lib/zod-validation/store'
import axios from 'axios'

class storeService {
	async createStore(data: TStoreSchema) {
		try {
			const response = await axios.post('/api/stores', data)

			return response.data
		} catch (error) {
			return error
		}
	}
}

export const StoreService = new storeService()
