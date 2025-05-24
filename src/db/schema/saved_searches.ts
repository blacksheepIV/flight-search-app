import {
  pgTable,
  serial,
  text,
  date,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'
import { users } from './user'

export const savedSearches = pgTable('saved_searches', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  originIata: text('origin_iata').notNull(),
  originCity: text('origin_city').notNull(),

  destinationIata: text('destination_iata').notNull(),
  destinationCity: text('destination_city').notNull(),

  departureDate: date('departure_date').notNull(),
  returnDate: date('return_date'),
  isRoundTrip: boolean('is_round_trip').notNull(),

  passengers: integer('passengers').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
})
