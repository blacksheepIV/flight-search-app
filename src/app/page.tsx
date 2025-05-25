import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FlightSearchSection from '@/app/features/flight-search/FlightSearchSection'
import type { SearchParamsType } from '@/app/features/flight-search/types/flight-search.ts'
import { parseSearchParams } from './utils/parseSearchParams'
import { getLocationByIata } from '@/app/lib/api/location-service'

interface PageSearchParams {
  searchParams: SearchParamsType
}

export default async function Home({ searchParams }: PageSearchParams) {
  const params = await searchParams
  const parsed = parseSearchParams(params)

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

  console.log({ initialParams })

  return (
    <main className="bg-white w-full min-h-screen flex flex-col">
      <Header />
      <div className="px-1 pb-[280px] lg:pb-[200px] md:my-5 max-w-5xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-alice_blue-100 mb-2 ">
            Find your next flight
          </h1>
          <p className="text-gray-600">
            Search, compare, and book flights from hundreds of airlines
          </p>
        </div>
        <FlightSearchSection initialParams={initialParams} />
      </div>
      <Footer />
    </main>
  )
}
