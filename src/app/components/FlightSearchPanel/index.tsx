'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { FlightSearchForm } from './types'

import {
  CalendarIcon,
  ArrowsRightLeftIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import LocationInput from '@/app/components/LocationInput'

const FlightSearchPanel: React.FC = () => {
  const { handleSubmit, control } = useForm<FlightSearchForm>()

  const onSubmit = (data: FlightSearchForm) => {
    console.log('Selected origin:', data.originQuery)
    console.log('Selected dest:', data.destinationQuery)
  }

  const swapLocations = () => {}

  //const handleSearch = () => {}
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200`}
          >
            Round Trip
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200`}
          >
            One Way
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
          {/* Origin */}
          <div className="md:col-span-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <Controller
              name="originQuery"
              control={control}
              render={({ field }) => (
                <LocationInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Swap button */}
          <div className="md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={swapLocations}
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
            >
              <ArrowsRightLeftIcon className="text-blue-600 w-[20px] h-[20px]" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Controller
              name="destinationQuery"
              control={control}
              render={({ field }) => (
                <LocationInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Departure Date */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
              <input
                type="date"
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers
            </label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={true}
          className={`w-full py-3 rounded-lg font-semibold`}
        >
          {/* {isLoading ? 'Searching...' : 'Search Flights'} */}
          Search Flights
        </button>
      </form>
    </div>
  )
}

export default FlightSearchPanel
