'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Flight } from '@/app/api/search-flights/types.ts'

interface FlightSearchContextValue {
  results: Flight[]
  setResults: (flights: Flight[]) => void
}

const FlightSearchContext = createContext<FlightSearchContextValue | undefined>(
  undefined,
)

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Flight[]>([])

  return (
    <FlightSearchContext.Provider value={{ results, setResults }}>
      {children}
    </FlightSearchContext.Provider>
  )
}

export const useFlightSearch = (): FlightSearchContextValue => {
  const context = useContext(FlightSearchContext)
  if (!context) {
    throw new Error(
      'useFlightSearch must be used within a FlightSearchProvider',
    )
  }
  return context
}
