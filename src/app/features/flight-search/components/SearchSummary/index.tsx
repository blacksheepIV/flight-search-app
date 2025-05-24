import React from 'react'
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useFlightsInfo } from '@/app/features/flight-search/contexts/FlightContext'

function SearchSummary() {
  const { searchParams, filteredFlights } = useFlightsInfo()
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
        <div className="flex items-center mb-2 md:mb-0">
          <MapPinIcon className="text-alice_blue-300 mr-2 w-[18px] h-[18px]" />
          <span className="text-lg font-medium">
            {searchParams.origin?.name} ({searchParams.origin?.iataCode}) to{' '}
            {searchParams.destination?.name} (
            {searchParams.destination?.iataCode})
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="text-alice_blue-300 mr-2 w-[18px] h-[18px]" />
          <span>
            {searchParams.departureDate}
            {searchParams.isRoundTrip && searchParams.returnDate && (
              <> - {searchParams.returnDate}</>
            )}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {filteredFlights.length}{' '}
        {filteredFlights.length === 1 ? 'flight' : 'flights'} found
        {searchParams.passengers > 1 && (
          <span> · {searchParams.passengers} passengers</span>
        )}
      </div>
    </div>
  )
}

export default SearchSummary
