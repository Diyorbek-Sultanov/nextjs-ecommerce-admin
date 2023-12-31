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

		const color = await db.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		})

		return NextResponse.json(color, { status: 201 })
	} catch (error) {
		console.log('color post', error)
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

		const colors = await db.color.findMany({
			where: {
				storeId: params.storeId,
			},
		})

		return NextResponse.json(colors)
	} catch (error) {
		console.log('colors get', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
