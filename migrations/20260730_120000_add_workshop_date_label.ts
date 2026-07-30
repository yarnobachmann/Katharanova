import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "workshops" ADD COLUMN IF NOT EXISTS "date_label" varchar;
    ALTER TABLE "_workshops_v" ADD COLUMN IF NOT EXISTS "version_date_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_workshops_v" DROP COLUMN IF EXISTS "version_date_label";
    ALTER TABLE "workshops" DROP COLUMN IF EXISTS "date_label";
  `)
}

