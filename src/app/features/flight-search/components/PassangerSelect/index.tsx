import React from 'react'
import Select, { components, type ControlProps } from 'react-select'
import { UsersIcon } from '@heroicons/react/24/outline'

interface PassengerOption {
  label: string
  value: number
}

interface PassengerSelectProps {
  value?: number
  onChange: (value: number) => void
}

const passengerOptions = Array.from({ length: 9 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? 'Passenger' : 'Passengers'}`,
}))

const PassangersSelect = ({ value, onChange }: PassengerSelectProps) => {
  const selected = passengerOptions.find(option => option.value === value)

  const CustomControl = (props: ControlProps<PassengerOption, false>) => (
    <components.Control {...props}>
      <div className="pl-2 flex items-center">
        <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
      </div>
      {props.children}
    </components.Control>
  )

  return (
    <div className="w-full">
      <Select
        options={passengerOptions}
        onChange={option => onChange(option?.value ?? 1)}
        value={selected}
        components={{
          Control: CustomControl,
        }}
        styles={{
          placeholder: base => ({
            ...base,
            paddingLeft: '1.25rem',
          }),
          input: base => ({
            ...base,
            paddingLeft: '1.25rem',
          }),
          singleValue: base => ({
            ...base,
            paddingLeft: '1.25rem',
          }),
          option: (base, state) => {
            let backgroundColor = '#ffffff'
            let color = '#171717'

            if (state.isSelected && state.isFocused) {
              backgroundColor = '#2499ff'
              color = '#ffffff'
            } else if (state.isSelected) {
              backgroundColor = '#2499ff'
              color = '#171717'
            } else if (state.isFocused) {
              backgroundColor = '#85c6ff'
              color = '#ffffff'
            }

            return {
              ...base,
              backgroundColor,
              color,
            }
          },
          control: (base, state) => ({
            ...base,
            borderRadius: '8px',
            borderColor: state.isFocused ? '#2499ff' : '#E5E5E5',
          }),
        }}
      />
    </div>
  )
}

export default PassangersSelect
