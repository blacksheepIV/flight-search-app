import { GetLocationsResponse } from './types'

let accessTokenCache: { token: string; expires: number } | null = null

async function getAmadeusAccessToken() {
  if (accessTokenCache && Date.now() < accessTokenCache.expires) {
    return accessTokenCache.token
  }

  const res = await fetch(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    },
  )

  const data = await res.json()

  if (!res.ok) throw new Error('Failed to get Amadeus access token')

  accessTokenCache = {
    token: data.access_token,
    expires: Date.now() + data.expires_in * 1000,
  }

  return data.access_token
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')

  if (!keyword) {
    return new Response(JSON.stringify([]), { status: 400 })
  }

  const token = await getAmadeusAccessToken()

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const data: GetLocationsResponse = await res.json()

  const cities = data.data?.map(item => ({
    id: item.id,
    name: item.name,
    iataCode: item.iataCode,
    country: item.address?.countryName,
    subType: item.subType,
  }))

  return Response.json(cities)
}
