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
export default defineConfig({
  schema: './schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
