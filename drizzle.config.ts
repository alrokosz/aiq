// import { type Config } from 'drizzle-kit'

// import { env } from '@/env'

// export default {
//   schema: './src/server/db/schema.ts',
//   driver: 'pg',
//   dbCredentials: {
//     host: process.env.PGHOST!,
//     database: env.DATABASE_URL,
//   },
//   tablesFilter: ['aiq_*'],
// } satisfies Config

import { defineConfig } from 'drizzle-kit'
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
console.log('DATABASE_URL', process.env.DATABASE_URL)
export default defineConfig({
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
