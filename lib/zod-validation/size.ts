import * as z from 'zod'

const sizeSchema = z.object({
	name: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
	value: z.string().min(1, { message: 'This field is required' }),
})

export type TSizeSchema = z.infer<typeof sizeSchema>

export { sizeSchema }
