'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import type { Flight } from '@/app/api/search-flights/types.ts'

import { ModifiedLocationsResponse } from '@/app/api/locations/types'

import { sortFlights, filterFlights } from '@/app/utils/flightUtils'

interface SearchParams {
  origin: ModifiedLocationsResponse | null
  destination: ModifiedLocationsResponse | null
  departureDate: string
  returnDate?: string
  isRoundTrip: boolean
  passengers: number
}

export type FilterOptions = {
  priceRange: [number, number]
  departureWindow: [number, number] // minutes from midnight (e.g. [360, 720] for 6:00 AM to 12:00 PM)
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
  filterOptions: FilterOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
  sortOption: string
  setSortOption: (val: string) => void
  reset: () => void
}

const FlightContext = createContext<FlightContextValue | undefined>(undefined)

const defaultFilterOptions: FilterOptions = {
  priceRange: [0, 1000],
  departureWindow: [0, 23],
}

export function FlightSearchProvider({
  children,
  initialParams = {},
}: {
  children: ReactNode
  initialParams?: Partial<SearchParams>
}) {
  const defaultSearchParams: SearchParams = {
    origin: initialParams.origin || null,
    destination: initialParams.destination || null,
    departureDate: initialParams.departureDate || '',
    returnDate: initialParams.returnDate || '',
    isRoundTrip: initialParams.isRoundTrip || false,
    passengers: initialParams.passengers || 1,
  }
  const [results, setResults] = useState<Flight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([...results])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams)
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(defaultFilterOptions)

  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    if (results.length > 0) {
      const filtered = filterFlights(results, filterOptions)
      const sorted = sortFlights(filtered, sortOption)

      setFilteredFlights(sorted)
    }
  }, [results, filterOptions, sortOption])

  const reset = () => {
    setResults([])
    setFilteredFlights([])
    setSortOption('')
    setFilterOptions(defaultFilterOptions)
    setSearchParams(defaultSearchParams)
    setHasSearched(false)
    setIsLoading(false)
  }

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
        filterOptions,
        setFilterOptions,
        sortOption,
        setSortOption,
        reset,
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
