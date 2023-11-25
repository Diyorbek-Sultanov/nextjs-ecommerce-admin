'use client'

import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'

const HomePage = () => {
	const open = useModal((state) => state.isOpen)
	const onOpen = useModal((state) => state.onOpen)

	useEffect(() => {
		if (!open) {
			onOpen()
		}
	}, [open, onOpen])

	return <div>page</div>
}

export default HomePage
