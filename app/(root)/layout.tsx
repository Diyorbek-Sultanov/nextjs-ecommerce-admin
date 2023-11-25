import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function HomeLayout({
	children,
}: PropsWithChildren<unknown>) {
	const { userId } = auth()

	if (!userId) {
		redirect('/')
	}

	const store = await db.store.findFirst({
		where: {
			userId,
		},
	})

	if (store) {
		redirect(`/${store.id}`)
	}

	return <>{children}</>
}
