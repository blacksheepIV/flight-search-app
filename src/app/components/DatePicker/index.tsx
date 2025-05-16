import React, { useState, useRef, useEffect } from 'react'
import Calendar from 'react-calendar'
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import 'react-calendar/dist/Calendar.css'
import './datePicker.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
  showRange?: boolean
  disablePast?: boolean
  onChange?: (value: Value) => void
  value?: ValuePiece
}

function DatePicker({
  showRange = false,
  disablePast = false,
  onChange,
  value: propValue,
}: Props) {
  const [internalValue, setInternalValue] = useState<Value>(
    propValue || new Date(),
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const value = propValue ?? internalValue
  const handleInputClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChange = (val: Value) => {
    setInternalValue(val)
    onChange?.(val)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDate = (date: Date | null | undefined) =>
    date?.toLocaleDateString() ?? ''

  let inputValue = ''
  if (showRange && Array.isArray(value)) {
    const [start, end] = value
    inputValue = `${formatDate(start)} - ${formatDate(end)}`
  } else if (!showRange && value instanceof Date) {
    inputValue = formatDate(value)
  }
  return (
    <div className="relative w-full" ref={calendarRef}>
      <CalendarDateRangeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
      <input
        type="text"
        readOnly
        className="w-full h-[50px] pl-[35px] border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
        value={inputValue}
        placeholder="Select date"
        onClick={handleInputClick}
      />
      {showCalendar && (
        <div className="absolute mt-1 bg-white rounded-lg shadow-lg z-20 border-0">
          <Calendar
            onChange={handleChange}
            value={value}
            selectRange={showRange}
            minDate={disablePast ? new Date() : undefined}
            className="rounded-lg border-0 shadow-none"
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker
