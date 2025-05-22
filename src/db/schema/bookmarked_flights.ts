import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { users } from './user'
export const bookmarkedFlights = pgTable('bookmarked_flights', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),

  flightId: text('flight_id').notNull(),

  originIata: text('origin_iata').notNull(),
  destinationIata: text('destination_iata').notNull(),

  departureTime: timestamp('departure_time').notNull(),
  arrivalTime: timestamp('arrival_time').notNull(),

  durationMinutes: integer('duration_minutes').notNull(),

  priceTotal: text('price_total').notNull(),
  priceCurrency: text('price_currency').notNull(),

  airlineName: text('airline_name').notNull(),
  airlineCode: text('airline_code').notNull(),

  bookmarkedAt: timestamp('bookmarked_at').defaultNow(),
})
