'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import CellActions from './cell-actions'

export type CategoryColumns = {
	id: string
	label: string
	billboardLabel: string
	createdAt: string
}

export const columns: ColumnDef<CategoryColumns>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
	},
	{
		accessorKey: 'billboardLabel',
		header: 'Billboard',
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
