import FlightSearchSection from '@/app/features/flight-search/FlightSearchSection'
import type { SearchParamsType } from '@/app/features/flight-search/types/flight-search.ts'
import { parseSearchParams } from './utils/parseSearchParams'
import { getLocationByIata } from '@/app/lib/api/location-service'

interface PageSearchParams {
  searchParams: Promise<SearchParamsType>
}

export default async function Home({ searchParams }: PageSearchParams) {
  const resolvedParams = await searchParams
  const parsed = parseSearchParams(resolvedParams)

  const [origin, destination] = await Promise.all([
    parsed?.origin ? getLocationByIata(parsed.origin) : null,
    parsed?.destination ? getLocationByIata(parsed.destination) : null,
  ])

  const initialParams = {
    origin,
    destination,
    departureDate: parsed.departureDate,
    returnDate: parsed.returnDate,
    isRoundTrip: parsed.isRoundTrip,
    passengers: parsed.passengers,
  }

  return (
    <div className="px-1 pb-[280px] lg:pb-[200px] md:my-5 max-w-5xl mx-auto ">
      <div className="my-8 md:mb-8 md:mt:0 ">
        <h1 className="text-3xl font-bold text-alice_blue-100 mb-2 ">
          Find your next flight
        </h1>
        <p className="text-gray-600">
          Search, compare, and book flights from hundreds of airlines
        </p>
      </div>
      <FlightSearchSection initialParams={initialParams} />
    </div>
  )
}
