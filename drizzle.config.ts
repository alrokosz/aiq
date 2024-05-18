import { type Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './src/server/db/schema.ts',
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
}) satisfies Config
