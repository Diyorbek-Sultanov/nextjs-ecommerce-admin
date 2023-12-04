import * as z from 'zod'

const productSchema = z.object({
	name: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
	images: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
	colorId: z.string().min(1),
	sizeId: z.string().min(1),
	isFeatured: z.boolean().default(false),
	isArchived: z.boolean().default(false),
})

export type TProductSchema = z.infer<typeof productSchema>

export { productSchema }
