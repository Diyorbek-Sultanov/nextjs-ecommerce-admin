type THeadingProps = {
	title: string
	description: string
}

const Heading: React.FC<THeadingProps> = ({ description, title }) => {
	return (
		<div>
			<h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
			<p className='text-muted-foreground text-sm'>{description}</p>
		</div>
	)
}

export default Heading
