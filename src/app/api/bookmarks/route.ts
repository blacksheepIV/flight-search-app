import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/db'
import { bookmarkedFlights } from '@/db/schema'
import { z } from 'zod'
import { authOptions } from '@/app/lib/auth'

const flightSchema = z.object({
  flightId: z.string(),
  originIata: z.string(),
  destinationIata: z.string(),
  departureTime: z.string().datetime(),
  arrivalTime: z.string().datetime(),
  durationMinutes: z.number().int().min(1),
  priceTotal: z.string(),
  priceCurrency: z.string(),
  airlineName: z.string(),
  airlineCode: z.string(),
})

/**
 * @description post api for bookmark
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = flightSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const data = parsed.data

  await db.insert(bookmarkedFlights).values({
    userId: session.user.id,
    ...data,
    departureTime: new Date(data.departureTime),
    arrivalTime: new Date(data.arrivalTime),
  })

  return NextResponse.json({ success: true })
}
