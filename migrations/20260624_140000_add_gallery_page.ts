import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gallery_eyebrow" varchar,
  	"gallery_title" varchar,
  	"gallery_intro" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_page_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0
  );
  
  DO $$ BEGIN
    ALTER TABLE "gallery_page_gallery_items" ADD CONSTRAINT "gallery_page_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "gallery_page_gallery_items" ADD CONSTRAINT "gallery_page_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "gallery_page_gallery_items_order_idx" ON "gallery_page_gallery_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "gallery_page_gallery_items_parent_id_idx" ON "gallery_page_gallery_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "gallery_page_gallery_items_image_idx" ON "gallery_page_gallery_items" USING btree ("image_id");
  
  INSERT INTO "gallery_page" ("gallery_eyebrow", "gallery_title", "gallery_intro", "updated_at", "created_at")
  SELECT "gallery_eyebrow", "gallery_title", "gallery_intro", now(), now()
  FROM "homepage"
  WHERE "gallery_eyebrow" IS NOT NULL
    OR "gallery_title" IS NOT NULL
    OR "gallery_intro" IS NOT NULL
    OR EXISTS (
      SELECT 1
      FROM "homepage_gallery_items"
      WHERE "homepage_gallery_items"."_parent_id" = "homepage"."id"
    )
    AND NOT EXISTS (SELECT 1 FROM "gallery_page")
  ORDER BY "id"
  LIMIT 1
  ON CONFLICT DO NOTHING;
  
  INSERT INTO "gallery_page_gallery_items" ("_order", "_parent_id", "id", "image_id", "caption", "order")
  SELECT "homepage_gallery_items"."_order", "gallery_page"."id", "homepage_gallery_items"."id", "homepage_gallery_items"."image_id", "homepage_gallery_items"."caption", "homepage_gallery_items"."order"
  FROM "homepage_gallery_items"
  CROSS JOIN "gallery_page"
  WHERE "gallery_page"."id" = (SELECT "id" FROM "gallery_page" ORDER BY "id" LIMIT 1)
  ON CONFLICT DO NOTHING;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gallery_page_gallery_items" CASCADE;
  DROP TABLE "gallery_page" CASCADE;`)
}
