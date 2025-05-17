// src/utils/flightUtils.ts
import type { Flight } from '@/app/api/search-flights/types'
import type { FilterOptions } from '@/app/features/flight-search/contexts/FlightContext'

export function filterFlights(
  flights: Flight[],
  filter: FilterOptions,
): Flight[] {
  return flights.filter(flight => {
    const totalPrice = parseFloat(flight.price.grandTotal)
    const withinPriceRange =
      totalPrice >= filter.priceRange[0] && totalPrice <= filter.priceRange[1]

    const firstSegment = flight.itineraries[0]?.segments[0]
    const departureTime =
      new Date(firstSegment?.departure.at || '').getHours() * 60 +
      new Date(firstSegment?.departure.at || '').getMinutes()
    const withinDepartureWindow =
      departureTime >= filter.departureWindow[0] &&
      departureTime <= filter.departureWindow[1]

    return withinPriceRange && withinDepartureWindow
  })
}

export function sortFlights(flights: Flight[], sortOption: string): Flight[] {
  return [...flights].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
      case 'price-desc':
        return parseFloat(b.price.grandTotal) - parseFloat(a.price.grandTotal)
      case 'duration-asc': {
        const getDurationInMinutes = (duration: string) => {
          const match = duration.match(/PT(\d+H)?(\d+M)?/)
          const hours = match?.[1] ? parseInt(match[1]) : 0
          const minutes = match?.[2] ? parseInt(match[2]) : 0
          return hours * 60 + minutes
        }
        const aDuration = getDurationInMinutes(a.itineraries[0].duration)
        const bDuration = getDurationInMinutes(b.itineraries[0].duration)
        return aDuration - bDuration
      }
      case 'departure-asc': {
        const aTime = new Date(
          a.itineraries[0].segments[0].departure.at,
        ).getTime()
        const bTime = new Date(
          b.itineraries[0].segments[0].departure.at,
        ).getTime()
        return aTime - bTime
      }
      default:
        return 0
    }
  })
}
