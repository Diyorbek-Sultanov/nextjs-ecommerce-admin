'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { ImagePlusIcon, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

type TImageUploadProps = {
	disabled?: boolean
	imageUlrs: string[]
	onChange: (value: string) => void
	onRemove: (value: string) => void
}

const ImageUpload: React.FC<TImageUploadProps> = ({
	imageUlrs,
	onChange,
	onRemove,
	disabled,
}) => {
	const onUpload = (result: any) => {
		onChange(result.info.secure_url)
	}

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{imageUlrs.map((image) => (
					<div
						key={image}
						className='relative h-[200px] w-[200px] aspect-square rounded-lg overflow-hidden'>
						<Image
							src={image}
							alt='image'
							fill
							className='object-cover object-center'
						/>
						<Button
							type='button'
							className='absolute top-2 right-2 z-10'
							variant={'destructive'}
							aria-label='delete image'
							onClick={() => onRemove(image)}>
							<span className='sr-only'>delete image</span>
							<Trash className='h-4 w-4' />
						</Button>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset='gclwbfti'>
				{({ open }) => {
					const onClick = () => {
						open()
					}

					return (
						<Button
							variant={'outline'}
							onClick={onClick}
							type='button'
							disabled={disabled}>
							<ImagePlusIcon className='mr-2 h-4 w-4' />
							Upload image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
