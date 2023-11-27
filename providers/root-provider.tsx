'use client'

import { type FC, type PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ModalProvider from './modal-provider'
import { Toaster } from 'sonner'

const RootProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<>
			<ModalProvider />
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools position='right' initialIsOpen={false} />
			</QueryClientProvider>
			<Toaster closeButton />
		</>
	)
}

export default RootProvider
