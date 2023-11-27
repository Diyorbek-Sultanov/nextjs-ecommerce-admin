'use client'

import { Copy, ServerIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Badge, type BadgeProps } from './ui/badge'
import { Button } from './ui/button'
import { toast } from 'sonner'

type TApiAlertProps = {
	title: string
	descripton: string
	variant: 'public' | 'admin'
}

const textMap: Record<TApiAlertProps['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
}

const variantMap: Record<TApiAlertProps['variant'], BadgeProps['variant']> = {
	admin: 'destructive',
	public: 'secondary',
}

const ApiAlert: React.FC<TApiAlertProps> = ({
	title,
	descripton,
	variant = 'public',
}) => {
	const onCopy = () => {
		navigator.clipboard.writeText(descripton)
		toast.success('API route copied to the clipboard')
	}

	return (
		<Alert>
			<ServerIcon className='h-4 w-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='mt-4 flex items-center justify-between'>
				<code className='font-mono rounded relative bg-muted px-[0.3rem] py-[0.2rem] text-sm font-bold'>
					{descripton}
				</code>
				<Button variant={'outline'} aria-label='copy api' onClick={onCopy}>
					<span className='sr-only'>copy api</span>
					<Copy className='h-4 w-4' />
				</Button>
			</AlertDescription>
		</Alert>
	)
}

export default ApiAlert
