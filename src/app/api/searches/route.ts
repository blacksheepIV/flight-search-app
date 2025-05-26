import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/db'
import { savedSearches } from '@/db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

const searchSchema = z.object({
  name: z.string().min(3),
  originIata: z.string(),
  originCity: z.string(),
  destinationIata: z.string(),
  destinationCity: z.string(),
  departureDate: z.string().date(),
  returnDate: z.string().date().optional(),
  isRoundTrip: z.boolean(),
  passengers: z.number().int().min(1),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = searchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const data = parsed.data

  try {
    await db.insert(savedSearches).values({
      userId: session.user.id,
      ...data,
      departureDate: data.departureDate,
      returnDate: data.returnDate ? data.returnDate : undefined,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to insert saved search:', error)
    return NextResponse.json(
      { error: 'Something went wrong saving your search.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookmarks = await db
      .select()
      .from(savedSearches)
      .where(eq(savedSearches.userId, session.user.id))

    return NextResponse.json({ bookmarks })
  } catch (error) {
    console.error('Failed to fetch bookmarked flights:', error)
    return NextResponse.json(
      { error: 'Something went wrong fetching your bookmarks.' },
      { status: 500 },
    )
  }
}
