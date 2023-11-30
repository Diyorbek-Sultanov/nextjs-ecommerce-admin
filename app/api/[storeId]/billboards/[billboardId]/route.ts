import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		if (!params.billboardId) {
			return new NextResponse('Billboard id is missing', { status: 400 })
		}

		const billboard = await db.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('billboard single get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
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

		if (!params.billboardId) {
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

		const billboard = await db.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		})

		return NextResponse.json(billboard, { status: 201 })
	} catch (error) {
		console.log('billboard patch', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.billboardId) {
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

		const billboard = await db.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		})

		return NextResponse.json(billboard)
	} catch (error) {
		console.log('billboard delete', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
