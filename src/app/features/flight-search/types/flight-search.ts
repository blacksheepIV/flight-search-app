import { ModifiedLocationsResponse } from '@/app/api/locations/types'

export type SearchParamsType = Record<string, string | string[] | undefined>

export interface ParsedSearchParams {
  origin: string
  destination: string
  departureDate: string
  returnDate: string
  isRoundTrip: boolean
  passengers: number
}

export type InitialParams = Pick<
  ParsedSearchParams,
  'departureDate' | 'returnDate' | 'isRoundTrip' | 'passengers'
> & {
  origin: ModifiedLocationsResponse | null
  destination: ModifiedLocationsResponse | null
}

export interface FlightSearchParams {
  initialParams?: InitialParams
}
