import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { label, imageUrl } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!label && !imageUrl) {
			return new NextResponse('Fields is missing', { status: 400 })
		}

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		})

		if (!storeByUserId) {
			return new NextResponse('Unautohorized', { status: 403 })
		}

		const billboard = await db.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(billboard, { status: 201 })
	} catch (error) {
		console.log('billboard post', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse('Store id is missing', { status: 400 })
		}

		const billboards = await db.billboard.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(billboards)
	} catch (error) {
		console.log('billboards get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
