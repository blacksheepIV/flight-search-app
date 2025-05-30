'use client'
import AsyncSelect from 'react-select/async'
import { components, type ControlProps } from 'react-select'
import type { ModifiedLocationsResponse } from '@/app/api/locations/types'

import { MapPinIcon } from '@heroicons/react/24/outline'

interface Props {
  value: ModifiedLocationsResponse | null
  onChange: (Location: ModifiedLocationsResponse | null) => void
}
interface LocationOption extends ModifiedLocationsResponse {
  label: string
  value: string
}

const getLocations = async (
  query: string,
): Promise<ModifiedLocationsResponse[]> => {
  const res = await fetch(`/api/locations?keyword=${query}`)
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json()
}

const LocationInput = ({ value, onChange }: Props) => {
  const loadOptions = async (inputValue: string): Promise<LocationOption[]> => {
    if (!inputValue) return []
    const data = await getLocations(inputValue.toUpperCase())

    return data.map((location: ModifiedLocationsResponse) => ({
      ...location,
      label: `${location.name}-(${location.iataCode})`,
      value: location.iataCode,
    }))
  }

  const CustomControl = (props: ControlProps<LocationOption, false>) => (
    <components.Control {...props}>
      <div className="pl-2 flex items-center">
        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
      </div>
      {props.children}
    </components.Control>
  )

  return (
    <div className="w-full">
      <AsyncSelect<LocationOption>
        cacheOptions
        defaultOptions={false}
        loadOptions={loadOptions}
        onChange={onChange}
        isClearable
        value={
          value
            ? {
                ...value,
                label: `${value.name} (${value.iataCode})`,
                value: value.iataCode,
              }
            : null
        }
        placeholder="Search city or airport"
        components={{
          Control: CustomControl,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
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

export default LocationInput
