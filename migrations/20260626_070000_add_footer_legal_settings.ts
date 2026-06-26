import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "kvk_text" varchar DEFAULT 'KvK 00000000';

    CREATE TABLE IF NOT EXISTS "site_settings_footer_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");

    INSERT INTO "site_settings_footer_links" ("_order", "_parent_id", "id", "label", "href")
    SELECT 1, "id", 'terms-link', 'Algemene voorwaarden', '/algemene-voorwaarden'
    FROM "site_settings"
    WHERE NOT EXISTS (
      SELECT 1 FROM "site_settings_footer_links" WHERE "id" = 'terms-link'
    );

    INSERT INTO "site_settings_footer_links" ("_order", "_parent_id", "id", "label", "href")
    SELECT 2, "id", 'privacy-link', 'Privacy', '/privacy'
    FROM "site_settings"
    WHERE NOT EXISTS (
      SELECT 1 FROM "site_settings_footer_links" WHERE "id" = 'privacy-link'
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "site_settings_footer_links_parent_id_idx";
    DROP INDEX IF EXISTS "site_settings_footer_links_order_idx";
    DROP TABLE IF EXISTS "site_settings_footer_links";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "kvk_text";
  `)
}
