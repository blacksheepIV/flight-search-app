import type { ModifiedLocationsResponse } from '@/app/api/locations/types'
export interface FlightSearchForm {
  originQuery: ModifiedLocationsResponse
  destinationQuery: ModifiedLocationsResponse
  departureDate: Date
  returnDate: Date
  passengers: number
}
