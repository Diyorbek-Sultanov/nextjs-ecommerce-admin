import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		if (!params.productId) {
			return new NextResponse('Product id is missing', { status: 400 })
		}

		const product = await db.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				category: true,
				images: true,
				size: true,
				color: true,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('product single get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth()
		const body = await req.json()

		const {
			name,
			price,
			categoryId,
			sizeId,
			colorId,
			images,
			isArchived,
			isFeatured,
		} = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name && !images) {
			return new NextResponse('Fields is missing', { status: 400 })
		}

		if (!params.productId) {
			return new NextResponse('Product id is missing', { status: 400 })
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

		await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				sizeId,
				colorId,
				isArchived,
				isFeatured,
				images: {
					deleteMany: {},
				},
			},
		})

		const product = await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		})

		return NextResponse.json(product, { status: 201 })
	} catch (error) {
		console.log('product patch', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.productId) {
			return new NextResponse('Product id is missing', { status: 400 })
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

		const product = await db.product.deleteMany({
			where: {
				id: params.productId,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log('product delete', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
