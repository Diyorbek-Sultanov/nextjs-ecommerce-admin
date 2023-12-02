'use client'

import AlertModal from '@/components/alert-modal'
import Heading from '@/components/heading'
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
import { useSize } from '@/hooks/use-size'
import { TSizeSchema, sizeSchema } from '@/lib/zod-validation/size'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Size } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TSizeFormProps = {
	initialData: Size | null
}

const SizeForm: React.FC<TSizeFormProps> = ({ initialData }) => {
	const [isOpen, setIsOpen] = useState(false)

	const {
		deleteLoading,
		deleteMutate,
		updateLoading,
		updateMutate,
		createLoading,
		createMutate,
	} = useSize()

	const form = useForm<TSizeSchema>({
		resolver: zodResolver(sizeSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
		mode: 'onChange',
	})

	const title = initialData ? 'Edit size' : 'Create size'
	const description = initialData ? 'Edit a size' : 'Add a new size'
	const action = initialData ? 'Save changes' : 'Create'

	const onSubmit = (values: TSizeSchema) => {
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
						<span className='sr-only'>delete size</span>
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
											placeholder='Size name'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							disabled={updateLoading || createLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='value'>Value</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='value'
											className='focus-visible:ring-offset-1 focus-visible:ring-sky-200/40'
											placeholder='Size value'
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

export default SizeForm
