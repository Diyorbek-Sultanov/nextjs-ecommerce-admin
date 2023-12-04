import type { TProductSchema } from '@/lib/zod-validation/product'
import axios from 'axios'

class productService {
	async createProduct(data: TProductSchema, storeId: string) {
		return await axios.post(`/api/${storeId}/products`, data)
	}

	async updateProduct(
		data: TProductSchema,
		storeId: string,
		productId: string
	) {
		return await axios.patch(`/api/${storeId}/products/${productId}`, data)
	}

	async deleteProduct(storeId: string, productId: string) {
		return await axios.delete(`/api/${storeId}/products/${productId}`)
	}
}

export const ProductService = new productService()
