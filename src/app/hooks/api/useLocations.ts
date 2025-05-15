import { getLocations } from '@/app/lib/api/getLocations'
import { useQuery } from '@tanstack/react-query'

export const useLocations = (location: string) => {
  return useQuery({
    queryKey: ['locations', location],
    queryFn: () => getLocations(location),
    enabled: !!location && location.length >= 2,
  })
}
