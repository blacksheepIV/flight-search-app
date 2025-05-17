'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Flight } from '@/app/api/search-flights/types.ts'

import { Location } from '@/app/api/locations/types'

interface SearchParams {
  origin: Location | null
  destination: Location | null
  departureDate: string
  returnDate?: string
  isRoundTrip: boolean
  passengers: number
}

interface FlightContextValue {
  results: Flight[]
  setResults: (flights: Flight[]) => void
  isLoading: boolean
  setIsLoading: (val: boolean) => void
  hasSearched: boolean
  setHasSearched: (val: boolean) => void
  searchParams: SearchParams
  setSearchParams: (params: SearchParams) => void
  filteredFlights: Flight[]
  setFilteredFlights: (flights: Flight[]) => void
}

const FlightContext = createContext<FlightContextValue | undefined>(undefined)

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Flight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: null,
    destination: null,
    departureDate: '',
    returnDate: '',
    isRoundTrip: true,
    passengers: 1,
  })

  return (
    <FlightContext.Provider
      value={{
        results,
        setResults,
        isLoading,
        setIsLoading,
        hasSearched,
        setHasSearched,
        searchParams,
        setSearchParams,
        filteredFlights,
        setFilteredFlights,
      }}
    >
      {children}
    </FlightContext.Provider>
  )
}

export const useFlightsInfo = (): FlightContextValue => {
  const context = useContext(FlightContext)
  if (!context) {
    throw new Error(
      'useFlightSearch must be used within a FlightSearchProvider',
    )
  }
  return context
}
