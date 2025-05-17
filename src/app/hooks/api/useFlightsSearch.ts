import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { GetFlightsResponse } from '@/app/api/search-flights/types'
import {
  searchFlights,
  type FlightSearchParams,
} from '@/app/lib/api/searchFlights'

export const useFlightsMutation = (
  options?: UseMutationOptions<GetFlightsResponse, Error, FlightSearchParams>,
) => {
  return useMutation<GetFlightsResponse, Error, FlightSearchParams>({
    mutationFn: searchFlights,
    ...options,
  })
}
