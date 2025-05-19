'use client'

import React, { useState } from 'react'
import {
  ClockIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import type { Flight } from '@/app/api/search-flights/types'
import { format } from 'date-fns'

import { formatDuration } from '@/app/utils/timeUtils'
import AirlineLogo from '@/app/components/AirlineLogo'

interface FlightCardProps {
  flight: Flight
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const [expanded, setExpanded] = useState(false)

  const firstItinerary = flight.itineraries[0]
  const firstSegment = firstItinerary.segments[0]
  const lastSegment =
    firstItinerary.segments[firstItinerary.segments.length - 1]

  const formatTime = (date: Date) => format(date, 'hh:mm a')

  const formatDate = (date: Date) => format(date, 'MMM d')

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-4">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Airline */}
          <div className="flex items-center mb-4 md:mb-0">
            {/* Airline logo missing in API response */}
            <div className="w-[90px] h-[30px] flex items-center justify-center  mr-3">
              <AirlineLogo
                iataCode={flight?.validatingAirlineCodes[0]}
                alt={flight?.validatingAirlineCodes[0] || ''}
              />
            </div>

            <div>
              <span className="font-medium">
                {/* Airline name comes from carrierCode; lookup required */}
                {flight.validatingAirlineCodes[0]}
              </span>
            </div>
          </div>

          {/* Flight Info */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Departure */}
            <div className="text-center md:text-right mb-2 md:mb-0">
              <div className="text-xl font-semibold">
                {formatTime(firstSegment.departure.at)}
              </div>
              <div className="text-sm text-gray-600">
                {firstSegment.departure.iataCode}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(firstSegment.departure.at)}
              </div>
            </div>

            {/* Duration & Stops */}
            <div className="flex flex-col items-center mx-8 mb-2 md:mb-0">
              <div className="text-xs text-gray-500 mb-1">
                {formatDuration(firstItinerary.duration)}
              </div>
              <div className="relative w-24 md:w-32">
                <div className="border-t-2 border-gray-300 absolute w-full top-1/2" />
                {firstItinerary.segments.length > 2
                  ? firstItinerary.segments.slice(1, -1).map((_, index) => (
                      <div
                        key={index}
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          left: `${
                            ((index + 1) / firstItinerary.segments.length) * 100
                          }%`,
                        }}
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      </div>
                    ))
                  : null}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {firstItinerary.segments.length <= 1
                  ? 'Non-stop'
                  : `${firstItinerary.segments.length - 1} stop${
                      firstItinerary.segments.length > 2 ? 's' : ''
                    }`}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center md:text-left mb-2 md:mb-0">
              <div className="text-xl font-semibold">
                {formatTime(lastSegment.arrival.at)}
              </div>
              <div className="text-sm text-gray-600">
                {lastSegment.arrival.iataCode}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(lastSegment.arrival.at)}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-center md:items-end">
            <div className="text-2xl font-bold text-blue-600">
              €{flight.price.grandTotal}
            </div>
            <div className="text-sm text-gray-600">per passenger</div>
          </div>
        </div>

        {/* Expand/Collapse */}
        <div
          className="flex items-center justify-center mt-4 pt-2 border-t border-gray-100 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="text-sm text-blue-600 mr-1">
            {expanded ? 'Hide details' : 'View details'}
          </span>
          {expanded ? (
            <ChevronUpIcon className="text-blue-600 w-[16px] h-[16px]" />
          ) : (
            <ChevronDownIcon className="text-blue-600 w-[16px] h-[16px]" />
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-start mb-4">
            <ClockIcon className="text-gray-500 mr-2 mt-1 w-[18px] h-[18px]" />
            <div>
              <h3 className="font-medium text-sm">Flight Duration</h3>
              <p className="text-gray-600">
                {formatDuration(firstItinerary.duration)}
              </p>
            </div>
          </div>

          {firstItinerary.segments.length > 1 && (
            <div className="mb-4">
              <h3 className="font-medium text-sm mb-2">Stops</h3>
              {firstItinerary.segments.slice(0, -1).map((segment, index) => {
                const layoverStart = new Date(segment.arrival.at)
                const layoverEnd = new Date(
                  firstItinerary.segments[index + 1].departure.at,
                )
                const layoverDurationMinutes = Math.floor(
                  (layoverEnd.getTime() - layoverStart.getTime()) / 60000,
                )

                return (
                  <div
                    key={index}
                    className="flex items-start mb-3 pl-5 border-l-2 border-orange-300"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{segment.arrival.iataCode}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(segment.arrival.at)} -{' '}
                        {formatTime(
                          firstItinerary.segments[index + 1].departure.at,
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        Layover:{' '}
                        {formatDuration(`PT${layoverDurationMinutes}M`)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex items-start">
            <InformationCircleIcon className="text-gray-500 mr-2 mt-1 w-[18px] h-[18px]" />
            <div>
              <h3 className="font-medium text-sm">Flight Details</h3>
              <p className="text-gray-600 text-sm">
                {/* Cabin class info is nested; simplified here */}
                {flight.validatingAirlineCodes[0]} - Economy
              </p>
              <div className="mt-2 flex space-x-4">
                <button className="text-blue-600 text-sm font-medium">
                  Fare Details
                </button>
                <button className="text-blue-600 text-sm font-medium">
                  Baggage Information
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlightCard
