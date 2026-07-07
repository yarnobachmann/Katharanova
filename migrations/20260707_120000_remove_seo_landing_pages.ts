import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "seo_landing_pages_related_links" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages_highlights" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages_sections" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql``)
}
