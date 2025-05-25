import type { SearchParamsType } from '@/app/features/flight-search/types/flight-search.ts'

export function parseSearchParams(searchParams: SearchParamsType) {
  return {
    origin: typeof searchParams.origin === 'string' ? searchParams.origin : '',
    destination:
      typeof searchParams.destination === 'string'
        ? searchParams.destination
        : '',
    departureDate:
      typeof searchParams.departureDate === 'string'
        ? searchParams.departureDate
        : '',
    returnDate:
      typeof searchParams.returnDate === 'string'
        ? searchParams.returnDate
        : '',
    isRoundTrip: searchParams.isRoundTrip === 'true',
    passengers: Number(searchParams.passengers) || 1,
  }
}
