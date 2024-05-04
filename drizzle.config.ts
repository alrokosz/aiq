import { type Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
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
}) satisfies Config
