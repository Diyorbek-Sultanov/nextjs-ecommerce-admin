import * as z from 'zod'

const billboardSchema = z.object({
	label: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
	imageUrl: z.string().min(1, { message: 'This field is required' }),
})

export type TBilboardSchema = z.infer<typeof billboardSchema>

export { billboardSchema }
