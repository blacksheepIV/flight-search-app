import type { ModifiedLocationsResponse } from './types'
import { fetchLocationsFromAmadeus } from '@/app/lib/api/amadeus/locations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')

  if (!keyword) {
    return new Response(JSON.stringify([]), { status: 400 })
  }

  try {
    const cities: ModifiedLocationsResponse[] = await fetchLocationsFromAmadeus(
      keyword,
    )
    return NextResponse.json(cities)
  } catch (e) {
    console.error(e)
    return NextResponse.json([], { status: 500 })
  }
}
