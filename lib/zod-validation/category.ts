import * as z from 'zod'

const categoyrSchema = z.object({
	name: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
	billboardId: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
})

export type TCategorySchema = z.infer<typeof categoyrSchema>

export { categoyrSchema }
