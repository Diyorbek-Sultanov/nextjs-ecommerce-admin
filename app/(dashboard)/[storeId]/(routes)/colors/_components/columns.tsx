'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellActions from './cell-actions'

export type ColorsColumns = {
	id: string
	label: string
	value: string
	createdAt: string
}

export const columns: ColumnDef<ColorsColumns>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-2'>
				{row.original.value}
				<div
					className='h-6 w-6 border-2 rounded-full'
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		),
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
