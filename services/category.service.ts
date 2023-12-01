import type { TCategorySchema } from '@/lib/zod-validation/category'
import axios from 'axios'

class categoryService {
	async createCategory(data: TCategorySchema, storeId: string) {
		return await axios.post(`/api/${storeId}/categories`, data)
	}

	async updateCategory(
		data: TCategorySchema,
		storeId: string,
		categoryId: string
	) {
		return await axios.patch(`/api/${storeId}/categories/${categoryId}`, data)
	}

	async deleteCategory(storeId: string, categoryId: string) {
		return await axios.delete(`/api/${storeId}/categories/${categoryId}`)
	}
}

export const CategoryService = new categoryService()
