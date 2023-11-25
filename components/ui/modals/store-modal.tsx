'use client'

import Modal from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal'
import { storeSchema, type TStoreSchema } from '@/lib/zod-validation/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { StoreService } from '@/services/store.service'

const StoreModal: React.FC = () => {
	const open = useModal((state) => state.isOpen)
	const onClose = useModal((state) => state.onClose)

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<TStoreSchema>({
		resolver: zodResolver(storeSchema),
		defaultValues: {
			name: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (values: TStoreSchema) => {
		try {
			setIsLoading(true)
			await StoreService.createStore(values)

			toast.success('Store success created')
		} catch (error) {
			const err = error as Error
			toast.error(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			isOpen={open}
			onClose={onClose}
			title='Create new store'
			description='Add a new store to manage products and categories'>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='name'
								disabled={isLoading}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='store'>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Store name...'
												className='focus-visible:ring-sky-200/40 focus-visible:ring-offset-1'
												id='store'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex items-center justify-end pt-6 space-x-2'>
								<Button
									variant={'outline'}
									onClick={onClose}
									type='button'
									disabled={isLoading}>
									Cancel
								</Button>
								<Button type='submit' disabled={isLoading}>
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}

export default StoreModal
