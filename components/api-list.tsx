'use client'

import { useOrigin } from '@/hooks/use-origin'
import { useParams } from 'next/navigation'
import ApiAlert from './api-alert'

type TApiListProps = {
	entityName: string
	entityIdName: string
}

const ApiList: React.FC<TApiListProps> = ({ entityIdName, entityName }) => {
	const params = useParams()
	const origin = useOrigin()

	const baseUrl = `${origin}/api/${params.storeId}`

	return (
		<>
			<ApiAlert
				title='GET'
				descripton={`${baseUrl}/${entityName}`}
				variant='public'
			/>
			<ApiAlert
				title='GET'
				descripton={`${baseUrl}/${entityName}/{${entityIdName}}`}
				variant='public'
			/>
			<ApiAlert
				title='POST'
				descripton={`${baseUrl}/${entityName}`}
				variant='admin'
			/>
			<ApiAlert
				title='PATCH'
				descripton={`${baseUrl}/${entityName}/{${entityIdName}}`}
				variant='admin'
			/>
			<ApiAlert
				title='DELETE'
				descripton={`${baseUrl}/${entityName}/{${entityIdName}}`}
				variant='admin'
			/>
		</>
	)
}

export default ApiList
