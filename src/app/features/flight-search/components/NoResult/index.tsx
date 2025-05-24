import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

function NoResult() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <ExclamationCircleIcon className="mx-auto text-orange-500 mb-4 w-[48px] h-[48px]" />
      <h2 className="text-xl font-semibold mb-2">No flights found</h2>
      <p className="text-gray-600 mb-4">
        We couldn&apos;t find any flights matching your criteria. Try adjusting
        your filters or search for different dates.
      </p>
    </div>
  )
}

export default NoResult
