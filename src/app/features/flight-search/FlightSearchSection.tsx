'use client'
import React from 'react'

import { FlightSearchProvider } from './contexts/FlightContext'
import FlightsListing from './components/FlightsListing'
import FlightSearchPanel from './components/FlightSearchPanel'

const FlightSearchSection: React.FC = () => {
  return (
    <FlightSearchProvider>
      <section className="space-y-8">
        <FlightSearchPanel />
        <FlightsListing />
      </section>
    </FlightSearchProvider>
  )
}

export default FlightSearchSection
