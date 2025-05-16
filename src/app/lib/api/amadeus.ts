let accessTokenCache: { token: string; expires: number } | null = null

export async function getAmadeusAccessToken() {
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
