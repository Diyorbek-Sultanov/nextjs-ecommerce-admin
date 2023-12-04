import * as z from 'zod'

const colorSchema = z.object({
	name: z
		.string({
			required_error: 'This field is required',
			invalid_type_error: 'It must be a string',
		})
		.min(1, { message: 'This field is required' }),
	value: z.string().min(4, { message: 'This field is required' }).regex(/^#/, {
		message: 'String must be a valid hex code',
	}),
})

export type TColorSchema = z.infer<typeof colorSchema>

export { colorSchema }
