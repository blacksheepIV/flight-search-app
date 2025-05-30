import React from 'react'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-200 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-200 rounded"></div>
            <div className="h-4 bg-blue-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Searching for the best flights...
      </p>
    </div>
  )
}

export default Loading
