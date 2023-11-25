'use client'

import Modal from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal'

const StoreModal: React.FC = () => {
	const open = useModal((state) => state.isOpen)
	const onClose = useModal((state) => state.onClose)

	return (
		<Modal
			isOpen={open}
			onClose={onClose}
			title='Create new store'
			description='Add a new store to manage products and categories'>
			form
		</Modal>
	)
}

export default StoreModal
