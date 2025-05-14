import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const client = postgres(process.env.DB_URL!, { prepare: false })
export const db = drizzle(client)

// export const db = drizzle({
//   connection: process.env.DB_URL!,
//   schema,
//   casing: 'snake_case',
// })
