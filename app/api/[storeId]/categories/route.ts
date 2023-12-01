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

		const { name, billboardId } = body

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name && !billboardId) {
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

		const category = await db.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(category, { status: 201 })
	} catch (error) {
		console.log('category post', error)
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

		const categories = await db.category.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(categories)
	} catch (error) {
		console.log('categories get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
