'use client'

import AlertModal from '@/components/alert-modal'
import Heading from '@/components/heading'
import ImageUpload from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
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
import { useCategory } from '@/hooks/use-category'
import {
	type TCategorySchema,
	categoyrSchema,
} from '@/lib/zod-validation/category'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Billboard, Category } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TCategoryFormProps = {
	initialData: Category | null
	billboards: Billboard[]
}

const CategoryForm: React.FC<TCategoryFormProps> = ({
	initialData,
	billboards,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const {
		deleteLoading,
		deleteMutate,
		updateLoading,
		updateMutate,
		createLoading,
		createMutate,
	} = useCategory()

	const form = useForm<TCategorySchema>({
		resolver: zodResolver(categoyrSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: undefined,
		},
		mode: 'onChange',
	})

	const title = initialData ? 'Edit category' : 'Create category'
	const description = initialData ? 'Edit a category' : 'Add a new category'
	const action = initialData ? 'Save changes' : 'Create'

	const onSubmit = (values: TCategorySchema) => {
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
						<span className='sr-only'>delete billboard</span>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
											placeholder='Category name'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='billboardId'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='billboard'>Billboard</FormLabel>
									<Select
										value={field.value}
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={updateLoading || createLoading}>
										<FormControl>
											<SelectTrigger className='focus:ring-offset-1 focus:ring-sky-200/40'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a billboard'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{billboards.map((billboard) => (
												<SelectItem key={billboard.id} value={billboard.id}>
													{billboard.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
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

export default CategoryForm
