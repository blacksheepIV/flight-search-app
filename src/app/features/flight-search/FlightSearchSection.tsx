'use client'
import React from 'react'

import { FlightSearchProvider } from './contexts/FlightContext'
import FlightsListing from './components/FlightsListing'
import FlightSearchPanel from './components/FlightSearchPanel'
import type { FlightSearchParams } from '@/app/features/flight-search/types/flight-search.ts'

const FlightSearchSection: React.FC<FlightSearchParams> = ({
  initialParams,
}) => {
  return (
    <FlightSearchProvider initialParams={initialParams}>
      <section className="space-y-8 max-w-5x">
        <FlightSearchPanel />
        <FlightsListing />
      </section>
    </FlightSearchProvider>
  )
}

export default FlightSearchSection
