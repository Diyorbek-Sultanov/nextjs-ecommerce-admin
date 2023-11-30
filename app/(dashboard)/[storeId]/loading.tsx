import { Loader } from 'lucide-react'

const Loading = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Loader className='h-5 w-5 animate-spin' />
		</div>
	)
}

export default Loading
