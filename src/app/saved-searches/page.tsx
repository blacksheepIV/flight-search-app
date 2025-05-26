import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/db'
import { savedSearches } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function SavedSearchesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/sign-in')
  }

  const searches = await db
    .select()
    .from(savedSearches)
    .where(eq(savedSearches.userId, session.user.id))

  return (
    <div className="w-full px-2 md:max-w-5xl md:mx-auto mt-5 bg-white min-h-full pb-[280px]">
      <h1 className="text-2xl font-bold mb-4 text-dodger_blue">
        Your Saved Searches
      </h1>

      {searches.length === 0 ? (
        <p className="text-gray-600">You haven’t saved any searches yet.</p>
      ) : (
        <div className="space-y-4">
          {searches.map(search => (
            <div
              key={search.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-4 flex flex-col gap-2 p-4"
            >
              <div className="text-lg font-semibold text-dodger_blue">
                {search.name}
              </div>
              <div>
                {search.originCity} ({search.originIata}) →{' '}
                {search.destinationCity} ({search.destinationIata})
              </div>
              <div>
                Departure: {new Date(search.departureDate).toLocaleDateString()}
              </div>
              {search.isRoundTrip && search.returnDate && (
                <div>
                  Return: {new Date(search.returnDate).toLocaleDateString()}
                </div>
              )}
              <div>Passengers: {search.passengers}</div>
              <div className="text-sm text-gray-500">
                {search.isRoundTrip ? 'Round Trip' : 'One Way'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
