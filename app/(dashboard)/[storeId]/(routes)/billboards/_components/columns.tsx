'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import CellActions from './cell-actions'

export type BillboardColumns = {
	id: string
	label: string
	image: string
	createdAt: string
}

export const columns: ColumnDef<BillboardColumns>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
	},
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => {
			const image = row.original.image

			return (
				<div className='relative w-12 h-12 rounded-lg overflow-hidden'>
					<Image
						src={image}
						alt='image'
						fill
						className='object-cover object-center'
					/>
				</div>
			)
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellActions data={row.original} />,
	},
]
