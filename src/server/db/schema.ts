import { relations, sql } from 'drizzle-orm'
import {
  index,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
  integer as int,
} from 'drizzle-orm/pg-core'
import { type AdapterAccount } from 'next-auth/adapters'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `aiq_${name}`)

export const users = createTable('user', {
  id: varchar('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar('image', { length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const accounts = createTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('accounts_userId_idx').on(account.userId),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  }),
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const cards = createTable('cards', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id),
  front: varchar('front').notNull(),
  back: varchar('back').notNull(),
  aiGenerated: boolean('aiGenerated').default(true),
  uploadId: varchar('uploadId')
    .notNull()
    .references(() => uploads.id),
  lastSeen: timestamp('lastSeen').default(sql`CURRENT_TIMESTAMP(3)`),
  nextReview: timestamp('nextReview').default(
    sql`CURRENT_TIMESTAMP(3) + interval '7 days'`,
  ),
  // A value used in spaced repetition algorithms (like the SuperMemo SM2 algorithm)
  // to determine the difficulty of the flashcard. The default value is typically set to 250 / 1000.
  easeFactor: int('easeFactor').default(250),
  //  The number of times the flashcard has been reviewed.
  repetitions: int('repetitions').default(0),
  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP(3)`),
})

export const uploads = createTable('uploads', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  size: int('size'),
  url: varchar('url', { length: 255 }),
  userId: varchar('userId').references(() => users.id),
  uploadThingKey: varchar('uploadThingKey', { length: 255 }),
  uploadedAt: timestamp('uploadedAt', {
    mode: 'date',
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  hasFlachcards: boolean('hasFlachcards').default(false),
})
