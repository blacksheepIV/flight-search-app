import type { GetFlightsResponse } from '@/app/api/search-flights/types'
export type FlightSearchParams = {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  adults?: number
}

export async function searchFlights(
  params: FlightSearchParams,
): Promise<GetFlightsResponse> {
  try {
    const res = await fetch('/api/search-flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Flight search failed: ${error}`)
    }

    return res.json()
  } catch (error) {
    console.error(error)
    throw Error('error in searchFlight')
  }
}
