'use client'
import React, { useState } from 'react'
import {
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { useFlightsInfo } from '@/app/features/flight-search/contexts/FlightContext'

type SortOption = {
  label: string
  value: string
}

type FilterOptions = {
  priceRange: [number, number]
  departureWindow: [number, number] // minutes from midnight (e.g. [360, 720] for 6:00 AM to 12:00 PM)
}

const FilterSection: React.FC = () => {
  const {
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    results,
  } = useFlightsInfo()

  const [expanded, setExpanded] = useState(false)

  const sortOptions: SortOption[] = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Duration: Shortest', value: 'duration-asc' },
    { label: 'Departure Time: Earliest', value: 'departure-asc' },
  ]

  const prices = results.map(result => parseFloat(result.price.grandTotal))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const handlePriceChange = (value: [number, number]) => {
    setFilterOptions((prev: FilterOptions) => ({
      ...prev,
      priceRange: value,
    }))
  }

  const handleDepartureTimeChange = (value: [number, number]) => {
    setFilterOptions((prev: FilterOptions) => ({
      ...prev,
      departureWindow: value,
    }))
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`
  }

  const formatPrice = (price: number) => `$${price}`

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 mb-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <FunnelIcon className="text-dodger_blue w-[20px] h-[20px]" />
          <h2 className="text-lg font-semibold">Filters & Sort</h2>
        </div>
        {expanded ? (
          <ChevronUpIcon className="text-gray-500 w-[20px] h-[20px]" />
        ) : (
          <ChevronDownIcon className="text-gray-500 w-[20px] h-[20px]" />
        )}
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sort By */}
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={option.value}
                    name="sort"
                    checked={sortOption === option.value}
                    onChange={() => handleSortChange(option.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filterOptions.priceRange[0])}</span>
                <span>{formatPrice(filterOptions.priceRange[1])}</span>
              </div>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filterOptions.priceRange[0]}
                onChange={e =>
                  handlePriceChange([
                    parseInt(e.target.value),
                    filterOptions.priceRange[1],
                  ])
                }
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filterOptions.priceRange[1]}
                onChange={e =>
                  handlePriceChange([
                    filterOptions.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Departure Time Window */}
          <div>
            <h3 className="font-medium mb-3">Departure Time Window</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(filterOptions.departureWindow[0])}</span>
                <span>{formatTime(filterOptions.departureWindow[1])}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1440}
                step={15}
                value={filterOptions.departureWindow[0]}
                onChange={e =>
                  handleDepartureTimeChange([
                    parseInt(e.target.value),
                    filterOptions.departureWindow[1],
                  ])
                }
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min={0}
                max={1440}
                step={15}
                value={filterOptions.departureWindow[1]}
                onChange={e =>
                  handleDepartureTimeChange([
                    filterOptions.departureWindow[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterSection
