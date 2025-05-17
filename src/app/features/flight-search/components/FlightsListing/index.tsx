import React from 'react'
import { useFlightsInfo } from '@/app/features/flight-search/contexts/FlightContext'
import FlightCard from '@/app/components/FlightCard'

import {
  MapPinIcon,
  CalendarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

const FlightsListing: React.FC = () => {
  const { results, isLoading, hasSearched, searchParams } = useFlightsInfo()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-200 rounded"></div>
              <div className="h-4 bg-blue-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          Searching for the best flights...
        </p>
      </div>
    )
  }

  if (!hasSearched) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <ExclamationCircleIcon className="mx-auto text-orange-500 mb-4 w-[48px] h-[48px]" />
        <h2 className="text-xl font-semibold mb-2">No flights found</h2>
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find any flights matching your criteria. Try
          adjusting your filters or search for different dates.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Search summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
          <div className="flex items-center mb-2 md:mb-0">
            <MapPinIcon className="text-blue-600 mr-2 w-[18px] h-[18px]" />
            <span className="text-lg font-medium">
              {searchParams.origin?.name} ({searchParams.origin?.iataCode}) to{' '}
              {searchParams.destination?.name} (
              {searchParams.destination?.iataCode})
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="text-blue-600 mr-2 w-[18px] h-[18px]" />
            <span>
              {searchParams.departureDate}
              {searchParams.isRoundTrip && searchParams.returnDate && (
                <> - {searchParams.returnDate}</>
              )}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {results.length} {results.length === 1 ? 'flight' : 'flights'} found
          {searchParams.passengers > 1 && (
            <span> · {searchParams.passengers} passengers</span>
          )}
        </div>
      </div>

      {/* Filters */}
      {/* <FilterPanel /> */}

      {/* Flight list */}
      <div className="space-y-4">
        {results.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  )
}

export default FlightsListing
