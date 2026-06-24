import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_page" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "hero_intro" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "gallery_page_hero_hero_image_idx" ON "gallery_page" USING btree ("hero_image_id");

  UPDATE "gallery_page"
  SET
    "hero_eyebrow" = COALESCE("gallery_eyebrow", 'Fotogallerij'),
    "hero_title" = COALESCE("gallery_title", 'Sfeer van de praktijk'),
    "hero_intro" = COALESCE("gallery_intro", 'Een indruk van de rust, natuur en aandacht die de begeleiding dragen.'),
    "hero_image_id" = (
      SELECT "image_id"
      FROM "gallery_photos"
      ORDER BY "order" ASC NULLS LAST, "id" ASC
      LIMIT 1
    );

  INSERT INTO "gallery_page" ("hero_eyebrow", "hero_title", "hero_intro", "hero_image_id", "updated_at", "created_at")
  SELECT
    'Fotogallerij',
    'Sfeer van de praktijk',
    'Een indruk van de rust, natuur en aandacht die de begeleiding dragen.',
    (
      SELECT "image_id"
      FROM "gallery_photos"
      ORDER BY "order" ASC NULLS LAST, "id" ASC
      LIMIT 1
    ),
    now(),
    now()
  WHERE NOT EXISTS (SELECT 1 FROM "gallery_page");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "gallery_page_hero_hero_image_idx";
  ALTER TABLE "gallery_page" DROP CONSTRAINT IF EXISTS "gallery_page_hero_image_id_media_id_fk";
  ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "hero_intro";
  ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "gallery_page" DROP COLUMN IF EXISTS "hero_eyebrow";`)
}
