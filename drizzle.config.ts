import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({
  path: resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  ),
})

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
