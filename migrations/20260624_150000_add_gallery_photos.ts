import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "gallery_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
    ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gallery_photos_id" integer;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk" FOREIGN KEY ("gallery_photos_id") REFERENCES "public"."gallery_photos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "gallery_photos_image_idx" ON "gallery_photos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "gallery_photos_updated_at_idx" ON "gallery_photos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gallery_photos_created_at_idx" ON "gallery_photos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_photos_id");
  
  INSERT INTO "gallery_photos" ("title", "image_id", "caption", "order", "active", "updated_at", "created_at")
  SELECT COALESCE(NULLIF("caption", ''), 'Galerij foto ' || ROW_NUMBER() OVER (ORDER BY "_order")) AS "title",
    "image_id",
    "caption",
    "order",
    true,
    now(),
    now()
  FROM "homepage_gallery_items"
  WHERE NOT EXISTS (SELECT 1 FROM "gallery_photos")
  ORDER BY "_order";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gallery_photos_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_gallery_photos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gallery_photos_id";
  DROP TABLE "gallery_photos" CASCADE;`)
}
