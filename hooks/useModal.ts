import { create } from 'zustand'

type TModalStore = {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

const useModal = create<TModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}))

export { useModal }
