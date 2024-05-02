// import { neon } from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-http'

// const sql = neon(process.env.DATABASE_URL!)
// export const db = drizzle(sql)

import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)
