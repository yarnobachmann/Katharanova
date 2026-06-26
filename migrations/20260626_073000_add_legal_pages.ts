import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "site_settings_footer_links_parent_id_idx";
    DROP INDEX IF EXISTS "site_settings_footer_links_order_idx";
    DROP TABLE IF EXISTS "site_settings_footer_links";

    CREATE TABLE IF NOT EXISTS "terms_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_intro" varchar,
      "content" jsonb,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "privacy_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_eyebrow" varchar,
      "hero_title" varchar,
      "hero_intro" varchar,
      "content" jsonb,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    INSERT INTO "terms_page" ("hero_eyebrow", "hero_title", "hero_intro", "updated_at", "created_at")
    SELECT
      'Voorwaarden',
      'Algemene voorwaarden',
      'Hier vind je de voorwaarden die gelden voor afspraken, sessies en workshops bij Kathara Nova.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "terms_page");

    INSERT INTO "privacy_page" ("hero_eyebrow", "hero_title", "hero_intro", "updated_at", "created_at")
    SELECT
      'Privacy',
      'Privacyverklaring',
      'Hier lees je hoe Kathara Nova omgaat met persoonsgegevens en vertrouwelijke informatie.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "privacy_page");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "privacy_page";
    DROP TABLE IF EXISTS "terms_page";
  `)
}
