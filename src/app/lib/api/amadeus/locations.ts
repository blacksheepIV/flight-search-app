import { getAmadeusAccessToken } from '@/app/lib/api/amadeus/tokens'
import type {
  GetLocationsResponse,
  ModifiedLocationsResponse,
} from '@/app/api/locations/types'

export async function fetchLocationsFromAmadeus(
  keyword: string,
): Promise<ModifiedLocationsResponse[]> {
  const token = await getAmadeusAccessToken()

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error(`Amadeus API failed with status ${res.status}`)
  }

  const data: GetLocationsResponse = await res.json()

  return (
    data.data?.map(item => ({
      id: item.id,
      name: item.name,
      iataCode: item.iataCode,
      country: item.address?.countryName,
      subType: item.subType,
    })) ?? []
  )
}
