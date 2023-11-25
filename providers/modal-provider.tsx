'use client'

import StoreModal from '@/components/ui/modals/store-modal'
import { useState, useEffect } from 'react'

const ModalProvider: React.FC = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<>
			<StoreModal />
		</>
	)
}

export default ModalProvider
