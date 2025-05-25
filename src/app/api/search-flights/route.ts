import { getAmadeusAccessToken } from '@/app/lib/api/amadeus/tokens'
import { NextResponse } from 'next/server'
import type { GetFlightsResponse } from './types'

export async function POST(req: Request) {
  const body = await req.json()

  const { origin, destination, departureDate, returnDate, adults = 1 } = body

  const token = await getAmadeusAccessToken()

  const searchUrl = new URL(
    'https://test.api.amadeus.com/v2/shopping/flight-offers',
  )

  searchUrl.searchParams.set('originLocationCode', origin)
  searchUrl.searchParams.set('destinationLocationCode', destination)
  searchUrl.searchParams.set('departureDate', departureDate)
  searchUrl.searchParams.set('adults', adults.toString())
  searchUrl.searchParams.set('max', '10') //TODO: add Pagination

  if (returnDate) {
    searchUrl.searchParams.set('returnDate', returnDate)
  }

  const res = await fetch(searchUrl.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data: GetFlightsResponse = await res.json()
  return NextResponse.json(data, { status: res.status })
}
