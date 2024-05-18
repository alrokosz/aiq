import { z } from 'zod'
import { nanoid } from 'nanoid'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { cards, uploads } from '@/server/db/schema'

export const uploadRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  createCards: protectedProcedure
    .input(
      z
        .object({
          front: z.string().min(1),
          back: z.string().min(1),
          uploadId: z.string(),
        })
        .array(),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(cards).values(
        input.map((card) => ({
          ...card,
          id: nanoid(),
          userId: ctx.session.user.id,
        })),
      )
    }),

  uploadFile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        size: z.number(),
        url: z.string(),
        uploadThingKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(uploads).values({
        id: nanoid(),
        name: input.name,
        size: input.size,
        url: input.url,
        userId: ctx.session.user.id,
        uploadThingKey: input.uploadThingKey,
      })
    }),

  getUploads: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.uploads.findMany({
      where: (uploads, { eq }) => eq(uploads.userId, ctx.session.user.id),
    })
  }),

  getUpload: protectedProcedure
    .input(z.object({ uploadId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.uploads.findMany({
        where: (uploads, { eq }) => eq(uploads.id, input.uploadId),
      })
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  }),
})
