import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { sizeId: string } }
) {
	try {
		if (!params.sizeId) {
			return new NextResponse('Size id is missing', { status: 400 })
		}

		const size = await db.category.findUnique({
			where: {
				id: params.sizeId,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('size single get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; sizeId: string } }
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

		if (!params.sizeId) {
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

		const size = await db.size.updateMany({
			where: {
				id: params.sizeId,
			},
			data: {
				name,
				value,
			},
		})

		return NextResponse.json(size, { status: 201 })
	} catch (error) {
		console.log('size patch', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; sizeId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.sizeId) {
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

		const size = await db.size.deleteMany({
			where: {
				id: params.sizeId,
			},
		})

		return NextResponse.json(size)
	} catch (error) {
		console.log('size delete', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
