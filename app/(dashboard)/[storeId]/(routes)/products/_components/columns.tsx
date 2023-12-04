'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import CellActions from './cell-actions'

export type ProductColumns = {
	id: string
	label: string
	price: string
	size: string
	color: string
	category: string
	isFeatured: boolean
	isArchived: boolean
	createdAt: string
}

export const columns: ColumnDef<ProductColumns>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
	},
	{
		accessorKey: 'isArchived',
		header: 'Archived',
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured',
	},
	{
		accessorKey: 'color',
		header: 'Color',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-2'>
				{row.original.color}
				<div
					className='border-2 rounded-full h-6 w-6'
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'size',
		header: 'Size',
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
