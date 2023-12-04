'use client'

import AlertModal from '@/components/alert-modal'
import Heading from '@/components/heading'
import ImageUpload from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useBillboard } from '@/hooks/use-billboard'
import { TProductSchema, productSchema } from '@/lib/zod-validation/product'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category, Color, Image, Product, Size } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TProductFormProps = {
	initialData:
		| (Product & {
				images: Image[]
		  })
		| null
	sizes: Size[]
	colors: Color[]
	categories: Category[]
}

const ProductForm: React.FC<TProductFormProps> = ({
	initialData,
	categories,
	sizes,
	colors,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const {
		deleteLoading,
		deleteMutate,
		updateLoading,
		updateMutate,
		createLoading,
		createMutate,
	} = useBillboard()

	const form = useForm<TProductSchema>({
		resolver: zodResolver(productSchema),
		defaultValues: initialData
			? {
					...initialData,
					price: parseFloat(String(initialData?.price)),
			  }
			: {
					name: '',
					price: 0,
					images: [],
					isArchived: false,
					isFeatured: false,
					categoryId: undefined,
					colorId: undefined,
					sizeId: undefined,
			  },
		mode: 'onChange',
	})

	const title = initialData ? 'Edit product' : 'Create product'
	const description = initialData ? 'Edit a product' : 'Add a new product'
	const action = initialData ? 'Save changes' : 'Create'

	const onSubmit = (values: TProductSchema) => {
		if (initialData) {
			updateMutate(values)
		} else {
			createMutate(values)
		}
	}

	return (
		<>
			<AlertModal
				title='You are sure?'
				descripton='This action cannot be undone'
				isLoading={deleteLoading}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={deleteMutate}
			/>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						size={'icon'}
						variant={'destructive'}
						aria-label='delete-store'
						disabled={updateLoading}
						onClick={() => setIsOpen(true)}>
						<span className='sr-only'>delete product</span>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='images'
						disabled={updateLoading}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<ImageUpload
										imageUlrs={field.value.map((image) => image.url)}
										disabled={updateLoading || createLoading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='name'
											className='focus-visible:ring-offset-1 focus-visible:ring-sky-200/40'
											placeholder='Product name'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='price'>Price</FormLabel>
									<FormControl>
										<Input
											type='number'
											id='price'
											className='focus-visible:ring-offset-1 focus-visible:ring-sky-200/40'
											placeholder='Product price'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categoryId'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='category'>Category</FormLabel>
									<Select
										value={field.value}
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={updateLoading || createLoading}>
										<FormControl>
											<SelectTrigger className='focus:ring-offset-1 focus:ring-sky-200/40'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a category'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='colorId'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='color'>Color</FormLabel>
									<Select
										value={field.value}
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={updateLoading || createLoading}>
										<FormControl>
											<SelectTrigger className='focus:ring-offset-1 focus:ring-sky-200/40'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a color'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{colors.map((color) => (
												<SelectItem key={color.id} value={color.id}>
													{color.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='sizeId'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='size'>Size</FormLabel>
									<Select
										value={field.value}
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={updateLoading || createLoading}>
										<FormControl>
											<SelectTrigger className='focus:ring-offset-1 focus:ring-sky-200/40'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a size'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sizes.map((size) => (
												<SelectItem key={size.id} value={size.id}>
													{size.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isFeatured'
							render={({ field }) => (
								<FormItem className='flex items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-0'>
										<FormLabel>Featured</FormLabel>
										<FormDescription>
											This product will appear on the home page
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isArchived'
							render={({ field }) => (
								<FormItem className='flex items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-0'>
										<FormLabel>Archived</FormLabel>
										<FormDescription>
											This product will not appear anywhere in the store
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' disabled={updateLoading || createLoading}>
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}

export default ProductForm
