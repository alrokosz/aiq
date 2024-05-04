DROP TABLE "aiq_post";--> statement-breakpoint
ALTER TABLE "aiq_decks" RENAME TO "aiq_uploads";--> statement-breakpoint
ALTER TABLE "aiq_cards" ALTER COLUMN "aiGenerated" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "aiq_user" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "aiq_user" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "aiq_user" ADD COLUMN "emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE "aiq_uploads" ADD COLUMN "size" integer;--> statement-breakpoint
ALTER TABLE "aiq_uploads" ADD COLUMN "url" varchar(255);