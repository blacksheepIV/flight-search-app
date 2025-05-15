import { useQuery } from '@tanstack/react-query'

export const useLocations = (location: string) => {
  return useQuery({
    queryKey: ['locations', location],
    queryFn: async () => {
      const res = await fetch(`/api/locations?keyword=${location}`)
      if (!res.ok) throw new Error('Failed to fetch cities')
      return res.json()
    },
    enabled: !!location && location.length >= 2,
  })
}
