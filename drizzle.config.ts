import { type Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
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
