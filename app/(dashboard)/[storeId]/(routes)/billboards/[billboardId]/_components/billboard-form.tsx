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
import { Separator } from '@/components/ui/separator'
import { useBillboard } from '@/hooks/use-billboard'
import {
	type TBilboardSchema,
	billboardSchema,
} from '@/lib/zod-validation/billboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TBillboardFormProps = {
	initialData: Billboard | null
}

const BillboardForm: React.FC<TBillboardFormProps> = ({ initialData }) => {
	const [isOpen, setIsOpen] = useState(false)

	const {
		deleteLoading,
		deleteMutate,
		updateLoading,
		updateMutate,
		createLoading,
		createMutate,
	} = useBillboard()

	const form = useForm<TBilboardSchema>({
		resolver: zodResolver(billboardSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
		mode: 'onChange',
	})

	const title = initialData ? 'Edit billboard' : 'Create billboard'
	const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
	const action = initialData ? 'Save changes' : 'Create'

	const onSubmit = (values: TBilboardSchema) => {
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
					<FormField
						control={form.control}
						name='imageUrl'
						disabled={updateLoading}
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='label'>Label</FormLabel>
								<FormControl>
									<ImageUpload
										imageUlrs={field.value ? [field.value] : []}
										disabled={updateLoading || createLoading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='label'>Label</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='label'
											className='focus-visible:ring-offset-1 focus-visible:ring-sky-200/40'
											placeholder='Billboard name'
										/>
									</FormControl>
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

export default BillboardForm
