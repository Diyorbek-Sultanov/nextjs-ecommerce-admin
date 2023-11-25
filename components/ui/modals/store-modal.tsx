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

const StoreModal: React.FC = () => {
	const open = useModal((state) => state.isOpen)
	const onClose = useModal((state) => state.onClose)

	const form = useForm<TStoreSchema>({
		resolver: zodResolver(storeSchema),
		defaultValues: {
			name: '',
		},
		mode: 'onChange',
	})

	const onSubmit = (values: TStoreSchema) => {
		console.log(values)
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
								<Button variant={'outline'} onClick={onClose} type='button'>
									Cancel
								</Button>
								<Button type='submit'>Submit</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}

export default StoreModal
