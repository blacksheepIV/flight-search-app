export const getLocations = async (query: string) => {
  const res = await fetch(`/api/locations?keyword=${query}`)
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json()
}
