import type { GetLocationsResponse } from './types'
import { getAmadeusAccessToken } from '@/app/lib/api/amadeus'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')

  if (!keyword) {
    return new Response(JSON.stringify([]), { status: 400 })
  }

  const token = await getAmadeusAccessToken()

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const data: GetLocationsResponse = await res.json()

  const cities = data.data?.map(item => ({
    id: item.id,
    name: item.name,
    iataCode: item.iataCode,
    country: item.address?.countryName,
    subType: item.subType,
  }))

  return NextResponse.json(cities, { status: res.status })
}
