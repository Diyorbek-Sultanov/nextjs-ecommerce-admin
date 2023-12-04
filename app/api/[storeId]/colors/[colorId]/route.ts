import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
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

		if (!params.colorId) {
			return new NextResponse('Size id is missing', { status: 400 })
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

		const color = await db.color.updateMany({
			where: {
				id: params.colorId,
			},
			data: {
				name,
				value,
			},
		})

		return NextResponse.json(color, { status: 201 })
	} catch (error) {
		console.log('color patch', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.colorId) {
			return new NextResponse('Billboard id is missing', { status: 400 })
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

		const color = await db.color.deleteMany({
			where: {
				id: params.colorId,
			},
		})

		return NextResponse.json(color)
	} catch (error) {
		console.log('color delete', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
