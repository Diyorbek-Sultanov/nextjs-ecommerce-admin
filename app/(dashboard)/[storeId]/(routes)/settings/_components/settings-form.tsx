'use client'

import AlertModal from '@/components/alert-modal'
import ApiAlert from '@/components/api-alert'
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
import { useOrigin } from '@/hooks/use-origin'
import { useStore } from '@/hooks/use-store'
import { TStoreSchema, storeSchema } from '@/lib/zod-validation/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TSettingsFormProps = {
	initialData: Store
}

const SettingsForm: React.FC<TSettingsFormProps> = ({ initialData }) => {
	const params = useParams()
	const origin = useOrigin()
	const [isOpen, setIsOpen] = useState(false)

	const { deleteLoading, deleteMutate, updateLoading, updateMutate } =
		useStore()

	const form = useForm<TStoreSchema>({
		resolver: zodResolver(storeSchema),
		defaultValues: initialData,
		mode: 'onChange',
	})

	const onSubmit = (values: TStoreSchema) => {
		updateMutate(values)
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
				<Heading title='Settings' description='Manage store preferences' />
				<Button
					size={'icon'}
					variant={'destructive'}
					aria-label='delete-store'
					disabled={updateLoading}
					onClick={() => setIsOpen(true)}>
					<span className='sr-only'>delete store</span>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							disabled={updateLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='storeName'>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											id='storeName'
											className='focus-visible:ring-offset-1 focus-visible:ring-sky-200/40'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' disabled={updateLoading}>
						Save changes
					</Button>
				</form>
			</Form>
			<ApiAlert
				title='NEXT_PUBLIC_API_URL'
				descripton={`${origin}/api/${params.storeId}`}
				variant='public'
			/>
		</>
	)
}

export default SettingsForm
