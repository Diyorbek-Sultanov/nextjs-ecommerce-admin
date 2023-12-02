'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import CellActions from './cell-actions'

export type SizesColumns = {
	id: string
	label: string
	value: string
	createdAt: string
}

export const columns: ColumnDef<SizesColumns>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
	},
	{
		accessorKey: 'value',
		header: 'Value',
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
