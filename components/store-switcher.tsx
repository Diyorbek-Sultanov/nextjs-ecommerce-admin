'use client'

import { Store } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from './ui/command'
import { useModal } from '@/hooks/useModal'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface IStoreSwitcherProps extends PopoverTriggerProps {
	items: Store[]
}

const StoreSwitcher: React.FC<IStoreSwitcherProps> = ({
	className,
	items = [],
}) => {
	const router = useRouter()
	const params = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const onOpen = useModal((state) => state.onOpen)

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}))

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	)

	const onStoreSelected = (storeId: string) => {
		setIsOpen(false)
		router.push(`/${storeId}`)
	}

	return (
		<Popover onOpenChange={setIsOpen} open={isOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					size={'sm'}
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Select a store'
					className={cn('w-[200px] justify-between', className)}>
					<StoreIcon className='mr-2 h-4 w-4' />
					{currentStore?.label}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Search store...' />
						<CommandEmpty>No store found.</CommandEmpty>
						<CommandGroup heading='stores'>
							{formattedItems.map((item) => (
								<CommandItem
									key={item.value}
									onSelect={() => onStoreSelected(item.value)}
									className='text-sm'>
									<StoreIcon className='mr-2 h-4 w-4' />
									{item.label}
									<Check
										className={cn(
											'ml-auto h-4 w- opacity-0',
											currentStore?.value === item.value && 'opacity-100'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setIsOpen(false)
									onOpen()
								}}>
								<PlusCircle className='mr-2 h-4 w-4' />
								Create new store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default StoreSwitcher
