import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		if (!params.categoryId) {
			return new NextResponse('Category id is missing', { status: 400 })
		}

		const category = await db.category.findUnique({
			where: {
				id: params.categoryId,
			},
			include: {
				billboard: true,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('category single get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name, billboardId } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name && !billboardId) {
			return new NextResponse('Fields is missing', { status: 400 })
		}

		if (!params.categoryId) {
			return new NextResponse('Category id is missing', { status: 400 })
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

		const category = await db.category.updateMany({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
				billboardId,
			},
		})

		return NextResponse.json(category, { status: 201 })
	} catch (error) {
		console.log('category patch', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.categoryId) {
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

		const category = await db.category.deleteMany({
			where: {
				id: params.categoryId,
			},
		})

		return NextResponse.json(category)
	} catch (error) {
		console.log('category delete', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
