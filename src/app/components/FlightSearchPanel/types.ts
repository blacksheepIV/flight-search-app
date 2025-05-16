import type { Location } from '@/app/api/locations/types'
export interface FlightSearchForm {
  originQuery: Location
  destinationQuery: Location
}
