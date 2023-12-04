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

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		})

		if (!storeByUserId) {
			return new NextResponse('Unautohorized', { status: 403 })
		}

		const product = await db.product.create({
			data: {
				name,
				categoryId,
				sizeId,
				colorId,
				isArchived,
				isFeatured,
				price,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		})

		return NextResponse.json(product, { status: 201 })
	} catch (error) {
		console.log('product post', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { searchParams } = new URL(req.url)
		const categoryId = searchParams.get('categoryId') || undefined
		const colorId = searchParams.get('colorId') || undefined
		const sizeId = searchParams.get('sizeId') || undefined
		const isFeatured = searchParams.get('isFeatured') || undefined

		if (!params.storeId) {
			return new NextResponse('Store id is missing', { status: 400 })
		}

		const products = await db.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(products)
	} catch (error) {
		console.log('products get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
