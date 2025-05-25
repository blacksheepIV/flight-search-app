import type { ModifiedLocationsResponse } from '@/app/api/locations/types'
import type { DatePickerValue } from '@/app/features/flight-search/components/DatePicker'

export interface FlightSearchForm {
  originQuery: ModifiedLocationsResponse
  destinationQuery: ModifiedLocationsResponse
  departureDate: DatePickerValue
  returnDate: DatePickerValue
  passengers: number
}

// Type guard to check if the value is a date range
export const isDateRange = (
  value: DatePickerValue,
): value is [Date | null, Date | null] => {
  return Array.isArray(value) && value.length === 2
}

// Type guard to check if the value is a single date
export const isSingleDate = (value: DatePickerValue): value is Date => {
  return value instanceof Date
}
