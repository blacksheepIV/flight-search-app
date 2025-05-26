'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useForm, Controller, useWatch } from 'react-hook-form'

import { type FlightSearchForm, isDateRange, isSingleDate } from './types'
import { ArrowsRightLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as FilledBookMark } from '@heroicons/react/24/solid'
import LocationInput from '@/app/features/flight-search/components/LocationInput'
import clsx from 'clsx'
import DatePicker from '@/app/features/flight-search/components/DatePicker'
import PassangersSelect from '@/app/features/flight-search/components/PassangerSelect'
import { useFlightsMutation } from '@/app/hooks/api/useFlightsSearch'
import { format, parseISO } from 'date-fns'
import { FlightSearchParams } from '@/app/lib/api/searchFlights'
import { useFlightsInfo } from '@/app/features/flight-search/contexts/FlightContext'
import type { DatePickerValue } from '@/app/features/flight-search/components/DatePicker'
import toast from 'react-hot-toast'

const FlightSearchPanel: React.FC = () => {
  const router = useRouter()

  const [isRoundTrip, setIsRoundTrip] = useState(true)
  const [savedSearch, setSavedSearch] = useState(false)
  const {
    searchParams,
    setResults,
    setIsLoading,
    setHasSearched,
    setSearchParams,
    reset,
    results,
  } = useFlightsInfo()

  const { mutate: lookUpFlights, isPending } = useFlightsMutation({
    onSuccess: data => {
      setResults(data.data)
      setIsLoading(false)
      setHasSearched(true)
    },
    onError: error => {
      console.error('Flight search failed:', error.message)
      setResults([])
      setIsLoading(false)
      setHasSearched(true)
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<FlightSearchForm>({
    defaultValues: {
      departureDate: new Date() as DatePickerValue,
      passengers: 1,
    },
    mode: 'onChange',
  })

  const originQuery = useWatch({ control, name: 'originQuery' })
  const destinationQuery = useWatch({ control, name: 'destinationQuery' })

  const isSwapDisabled = !originQuery || !destinationQuery

  const formatSearchParams = (
    data: FlightSearchForm,
    isRoundTrip: boolean,
  ): {
    query: URLSearchParams
    apiParams: FlightSearchParams
    contextParams: typeof searchParams
  } | null => {
    let departureDate: string | null = null
    let returnDate: string | null = null

    if (isDateRange(data.departureDate) && isRoundTrip) {
      const [start, end] = data.departureDate
      if (start) departureDate = format(start, 'yyyy-MM-dd')
      if (end) returnDate = format(end, 'yyyy-MM-dd')
    } else if (isSingleDate(data.departureDate)) {
      departureDate = format(data.departureDate, 'yyyy-MM-dd')
    }

    if (!departureDate) return null

    const apiParams: FlightSearchParams = {
      origin: data.originQuery.iataCode,
      destination: data.destinationQuery.iataCode,
      adults: data.passengers,
      departureDate,
      ...(returnDate && { returnDate }),
    }

    const contextParams = {
      isRoundTrip,
      origin: data.originQuery,
      destination: data.destinationQuery,
      passengers: data.passengers,
      departureDate,
      ...(returnDate && { returnDate }),
    }

    const query = new URLSearchParams({
      origin: data.originQuery.iataCode,
      destination: data.destinationQuery.iataCode,
      departureDate,
      passengers: String(data.passengers),
      isRoundTrip: String(isRoundTrip),
    })
    if (returnDate) query.set('returnDate', returnDate)

    return { apiParams, contextParams, query }
  }

  const performSearch = (apiParams: FlightSearchParams) => {
    setIsLoading(true)
    lookUpFlights(apiParams)
  }

  const onSubmit = (data: FlightSearchForm) => {
    if (results.length > 0) reset()

    const formatted = formatSearchParams(data, isRoundTrip)
    if (!formatted) {
      setIsLoading(false)
      return
    }

    const { apiParams, contextParams, query } = formatted

    setSearchParams(contextParams)
    router.push(`/?${query.toString()}`)
    performSearch(apiParams)
  }

  useEffect(() => {
    if (!searchParams) return

    if (searchParams.origin) {
      setValue('originQuery', searchParams.origin)
    }
    if (searchParams.destination) {
      setValue('destinationQuery', searchParams.destination)
    }

    if (searchParams.departureDate) {
      const dep = parseISO(searchParams.departureDate)
      if (searchParams.returnDate) {
        const ret = parseISO(searchParams.returnDate)
        setValue('departureDate', [dep, ret] as DatePickerValue)
      } else {
        setValue('departureDate', dep as DatePickerValue)
      }
    }

    if (searchParams.passengers) {
      setValue('passengers', searchParams.passengers)
    }

    setIsRoundTrip(searchParams.isRoundTrip ?? true)
    trigger()
    setTimeout(() => {
      const values = getValues()
      const formatted = formatSearchParams(
        values,
        searchParams.isRoundTrip ?? true,
      )

      if (formatted) performSearch(formatted.apiParams)
    }, 50)
  }, [searchParams, setValue])

  const swapLocations = () => {
    const origin = getValues('originQuery')
    const destination = getValues('destinationQuery')
    setValue('originQuery', destination)
    setValue('destinationQuery', origin)
  }

  const saveSearchFilters = async () => {
    const values = getValues()
    const formatted = formatSearchParams(values, isRoundTrip)
    if (!formatted) {
      toast.error('Please complete the form before bookmarking.')
      return
    }

    const { contextParams } = formatted

    const now = new Date()
    const bookmarkName = `Search-${now
      .toISOString()
      .slice(0, 16)
      .replace('T', ' ')}`

    const payload = {
      name: bookmarkName,
      originIata: contextParams.origin?.iataCode,
      originCity: contextParams.origin?.name,
      destinationIata: contextParams.destination?.iataCode,
      destinationCity: contextParams.destination?.name,
      departureDate: contextParams.departureDate,
      returnDate: contextParams?.returnDate ?? undefined,
      isRoundTrip,
      passengers: contextParams.passengers,
    }

    try {
      const res = await fetch('/api/searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success('Search saved successfully!')
      } else {
        const error = await res.json()
        toast.error(`Failed to save search: ${error.error}`)
      }
      setSavedSearch(true)
      //TODO: Reset "saved" if form values change
    } catch (err) {
      console.error('Save search failed:', err)
      toast.error('Something went wrong while saving your search.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full  lg:h-[400px] max-h-[550px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={clsx(
              'px-4 py-2 rounded-full font-medium text-sm md:text-lg transition-colors duration-200 cursor-pointer',
              isRoundTrip
                ? 'bg-dodger_blue-600 text-white hover:opacity-85'
                : 'border-1 border-border text-primary',
            )}
            onClick={() => setIsRoundTrip(true)}
          >
            Round Trip
          </button>
          <button
            type="button"
            className={clsx(
              'px-4 py-2 rounded-full font-medium text-sm md:text-lg transition-colors duration-200 cursor-pointer',
              !isRoundTrip
                ? 'bg-dodger_blue-600 text-white hover:opacity-85'
                : 'border-1 border-border text-primary',
            )}
            onClick={() => setIsRoundTrip(false)}
          >
            One Way
          </button>
        </div>
        <button
          type="button"
          className={clsx(
            'p-2 rounded-full ',
            isValid
              ? 'cursor-pointer transition-colors hover:bg-border hover:text-white'
              : 'cursor-not-allowed',
          )}
          onClick={saveSearchFilters}
        >
          {!savedSearch ? (
            <BookmarkIcon
              className={clsx('w-[20px] h-[20px]', { 'text-border': !isValid })}
            />
          ) : (
            <FilledBookMark
              className={clsx('w-[20px] h-[20px]', { 'text-border': !isValid })}
            />
          )}
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:h-[256px] md:max-h-[256px]"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 items-end mb-6 md:h-[80px] max-h[80px]">
          {/* Origin */}
          <div className="md:col-span-5 relative self-end md:h-full md:w-[250px]">
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
          <div className="md:col-span-2 flex items-center justify-center self-end  md:h-full">
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
          <div className="md:col-span-5 relative self-end  md:h-full md:w-[250px]">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 md:h-[80px] max-h[80px]">
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
                  value={field.value}
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
            `w-full py-3 rounded-lg font-semibold bg-dodger_blue text-white`,
            !isValid ? 'cursor-not-allowed opacity-80' : 'cursor-pointer',
            { 'cursor-not-allowed': isPending },
          )}
        >
          {isPending ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
    </div>
  )
}

export default FlightSearchPanel
