'use client'
import React, { useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'

import type { FlightSearchForm } from './types'

import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import LocationInput from '@/app/components/LocationInput'
import clsx from 'clsx'
import DatePicker from '@/app/components/DatePicker'
import PassangersSelect from '@/app/components/PassangerSelect'

const FlightSearchPanel: React.FC = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(true)

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FlightSearchForm>({
    defaultValues: {
      departureDate: new Date(),
      returnDate: new Date(),
      passengers: 1,
    },
    mode: 'onChange',
  })

  const originQuery = useWatch({ control, name: 'originQuery' })
  const destinationQuery = useWatch({ control, name: 'destinationQuery' })

  const isSwapDisabled = !originQuery || !destinationQuery

  const onSubmit = (data: FlightSearchForm) => {
    console.log('Form Data:', data)
  }

  const swapLocations = () => {
    const origin = getValues('originQuery')
    const destination = getValues('destinationQuery')
    setValue('originQuery', destination)
    setValue('destinationQuery', origin)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={clsx(
              'px-4 py-2 rounded-full font-medium transition-colors duration-200',
              isRoundTrip
                ? 'bg-dodger_blue-600 text-white'
                : 'border-2 border-dodger_blue-600 text-black',
            )}
            onClick={() => setIsRoundTrip(true)}
          >
            Round Trip
          </button>
          <button
            type="button"
            className={clsx(
              'px-4 py-2 rounded-full font-medium transition-colors duration-200',
              !isRoundTrip
                ? 'bg-dodger_blue-600 text-white'
                : 'border-2 border-dodger_blue-600 text-black',
            )}
            onClick={() => setIsRoundTrip(false)}
          >
            One Way
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6 md:h-[80px] max-h[80px]">
          {/* Origin */}
          <div className="md:col-span-5 relative self-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <Controller
              name="originQuery"
              control={control}
              rules={{ required: 'Origin is required' }}
              render={({ field }) => (
                <>
                  <LocationInput {...field} />
                  {errors.originQuery && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.originQuery.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Swap button */}
          <div className="md:col-span-2 flex items-center justify-center self-end">
            <button
              type="button"
              disabled={isSwapDisabled}
              onClick={swapLocations}
              className={clsx(
                'p-2 rounded-full ',
                {
                  'bg-blue-50 hover:bg-blue-100 transition-colors duration-200':
                    !isSwapDisabled,
                },
                {
                  'cursor-not-allowed bg-gray-200': isSwapDisabled,
                },
              )}
            >
              <ArrowsRightLeftIcon
                className={clsx(
                  ' w-[20px] h-[20px]',
                  { 'text-dodger_blue': !isSwapDisabled },
                  {
                    'text-black-200': isSwapDisabled,
                  },
                )}
              />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 relative self-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Controller
              name="destinationQuery"
              control={control}
              rules={{ required: 'Destination is required' }}
              render={({ field }) => (
                <>
                  <LocationInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.destinationQuery && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.destinationQuery.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 md:h-[80px] max-h[80px]">
          {/* Departure Date */}
          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRoundTrip ? 'Departure - Return' : 'Departure'}
            </label>
            <Controller
              name="departureDate"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <DatePicker
                  showRange={isRoundTrip}
                  disablePast
                  onChange={field.onChange}
                />
              )}
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departureDate.message}
              </p>
            )}
          </div>
          {/* Passengers */}
          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers
            </label>
            <div className="relative">
              <Controller
                name="passengers"
                control={control}
                rules={{ required: 'Please select number of passengers' }}
                render={({ field }) => (
                  <PassangersSelect
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              {errors.passengers && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passengers.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={clsx(
            `w-full py-3 rounded-lg font-semibold bg-alice_blue-100 text-white`,
            !isValid ? 'cursor-not-allowed bg-opacity-20' : 'cursor-pointer',
          )}
        >
          {/* {isLoading ? 'Searching...' : 'Search Flights'} */}
          Search Flights
        </button>
      </form>
    </div>
  )
}

export default FlightSearchPanel
