'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Copy, Edit3, MoreHorizontal, Trash } from 'lucide-react'
import type { ColorsColumns } from './columns'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import AlertModal from '@/components/alert-modal'
import { useColors } from '@/hooks/use-colors'

const CellActions: React.FC<{ data: ColorsColumns }> = ({ data }) => {
	const params = useParams()
	const [isOpen, setIsOpen] = useState(false)

	const { deleteLoading, deleteMutate } = useColors(data.id)

	const onCopy = () => {
		navigator.clipboard.writeText(data.id)
		toast.success('API route copied to the clipboard')
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className='h-8 w-8 p-0' variant={'outline'}>
						<span className='sr-only'>open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={onCopy}>
						<Copy className='h-4 w-4 mr-2' />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={`/${params.storeId}/colors/${data.id}`}>
							<Edit3 className='h-4 w-4 mr-2' />
							Edit
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpen(true)}>
						<Trash className='h-4 w-4 mr-2' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default CellActions
