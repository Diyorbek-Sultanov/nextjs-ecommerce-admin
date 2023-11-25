import type { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='flex items-center justify-center h-full'>{children}</div>
	)
}
