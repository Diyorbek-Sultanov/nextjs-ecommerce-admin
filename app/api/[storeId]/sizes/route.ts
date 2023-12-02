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

		const { name, value } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name && !value) {
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

		const size = await db.size.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(size, { status: 201 })
	} catch (error) {
		console.log('size post', error)
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

		const sizes = await db.size.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(sizes)
	} catch (error) {
		console.log('sizes get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
