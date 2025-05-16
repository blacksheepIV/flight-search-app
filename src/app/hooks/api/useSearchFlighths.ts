import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import {
  searchFlights,
  type FlightSearchParams,
} from '@/app/lib/api/searchFlights'

export const useFlightMutation = (
  options?: UseMutationOptions<unknown, Error, FlightSearchParams>,
) => {
  return useMutation({
    mutationFn: searchFlights,
    ...options,
  })
}
