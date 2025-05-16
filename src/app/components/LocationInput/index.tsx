'use client'
import AsyncSelect from 'react-select/async'
import { components, type ControlProps } from 'react-select'
import type { Location } from '@/app/api/locations/types'
import { getLocations } from '@/app/lib/api/getLocations'
import { MapPinIcon } from '@heroicons/react/24/outline'

interface Props {
  value: Location | null
  onChange: (Location: Location | null) => void
}
interface LocationOption extends Location {
  label: string
  value: string
}

const LocationInput = ({ value, onChange }: Props) => {
  const loadOptions = async (inputValue: string): Promise<LocationOption[]> => {
    if (!inputValue) return []
    const data = await getLocations(inputValue)

    return data.map((location: Location) => ({
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
    <div className="w-full md:max-w-[250px]">
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
          option: (base, state) => ({
            ...base,
            color: state.isSelected ? '#118ff8' : '#333333',
          }),
        }}
      />
    </div>
  )
}

export default LocationInput
