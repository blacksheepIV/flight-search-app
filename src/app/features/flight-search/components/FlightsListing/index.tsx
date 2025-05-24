import React from 'react'
import { useFlightsInfo } from '@/app/features/flight-search/contexts/FlightContext'
import FlightCard from '@/app/features/flight-search/components/FlightCard'

import FilterSection from '@/app/features/flight-search/components/FilterSection'
import Loading from '@/app/features/flight-search/components/Loading'
import NoResult from '@/app/features/flight-search/components/NoResult'
import SearchSummary from '@/app/features/flight-search/components/SearchSummary'

const FlightsListing: React.FC = () => {
  const { isLoading, hasSearched, filteredFlights } = useFlightsInfo()

  if (isLoading) return <Loading />
  if (!hasSearched) return null
  if (filteredFlights.length === 0) return <NoResult />

  return (
    <div>
      <SearchSummary />
      <FilterSection />
      <div className="space-y-4">
        {filteredFlights.map(flight => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  )
}

export default FlightsListing
