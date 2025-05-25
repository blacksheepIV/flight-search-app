import { ModifiedLocationsResponse } from '@/app/api/locations/types'
import { fetchLocationsFromAmadeus } from '@/app/lib/api/amadeus/locations'

export const getLocationByIata = async (
  iataCode: string,
): Promise<ModifiedLocationsResponse | null> => {
  try {
    const list = await fetchLocationsFromAmadeus(iataCode)
    return (
      list.find(loc => loc.iataCode === iataCode.toUpperCase()) ||
      list[0] ||
      null
    )
  } catch (error) {
    console.error(error)
    return Promise.reject()
  }
}
