'use client'

import { useEffect, useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'

type TAlerModalProps = {
	isLoading: boolean
	onClose: () => void
	onConfirm: () => void
	isOpen: boolean
	title: string
	descripton: string
}

const AlertModal: React.FC<TAlerModalProps> = ({
	isLoading,
	onClose,
	onConfirm,
	isOpen,
	title,
	descripton,
}) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{descripton}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} disabled={isLoading}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AlertModal
