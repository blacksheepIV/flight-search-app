import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/db'
import { bookmarkedFlights } from '@/db/schema'
import { z } from 'zod'
import { authOptions } from '@/app/lib/auth'
import { eq } from 'drizzle-orm'

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
  try {
    await db.insert(bookmarkedFlights).values({
      userId: session.user.id,
      ...data,
      departureTime: new Date(data.departureTime),
      arrivalTime: new Date(data.arrivalTime),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to insert bookmarked flight:', error)
    return NextResponse.json(
      { error: 'Something went wrong saving your bookmark.' },
      { status: 500 },
    )
  }
}

/**
 * @description GET API to fetch all bookmarked flights for the current user
 */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookmarks = await db
      .select()
      .from(bookmarkedFlights)
      .where(eq(bookmarkedFlights.userId, session.user.id))

    return NextResponse.json({ bookmarks })
  } catch (error) {
    console.error('Failed to fetch bookmarked flights:', error)
    return NextResponse.json(
      { error: 'Something went wrong fetching your bookmarks.' },
      { status: 500 },
    )
  }
}
