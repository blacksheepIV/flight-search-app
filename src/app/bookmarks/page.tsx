import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/db'
import { bookmarkedFlights } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/sign-in')
  }

  const bookmarks = await db
    .select()
    .from(bookmarkedFlights)
    .where(eq(bookmarkedFlights.userId, session.user.id))

  return (
    <div className="w-full px-2 md:max-w-5xl md:mx-auto mt-5 bg-white min-h-full pb-[280px] ">
      <h1 className="text-2xl font-bold mb-4 text-dodger_blue">
        Your Bookmarked Flights
      </h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarked flights yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map(flight => (
            <div
              key={flight.flightId}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-4 flex flex-col gap-2 p-4"
            >
              <span className="font-medium">
                {flight.airlineName} ({flight.airlineCode})
              </span>
              <span>
                {flight.originIata} → {flight.destinationIata}
              </span>
              <span>
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </span>
              <div>
                Arrival: {new Date(flight.arrivalTime).toLocaleString()}
              </div>
              <div>Duration: {flight.durationMinutes} min</div>
              <div>
                Price: {flight.priceTotal} {flight.priceCurrency}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}
