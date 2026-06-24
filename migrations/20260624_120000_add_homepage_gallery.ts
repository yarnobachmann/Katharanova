import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0
  );
  
  ALTER TABLE "homepage" ADD COLUMN "gallery_eyebrow" varchar;
  ALTER TABLE "homepage" ADD COLUMN "gallery_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "gallery_intro" varchar;
  ALTER TABLE "homepage_gallery_items" ADD CONSTRAINT "homepage_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_gallery_items" ADD CONSTRAINT "homepage_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_gallery_items_order_idx" ON "homepage_gallery_items" USING btree ("_order");
  CREATE INDEX "homepage_gallery_items_parent_id_idx" ON "homepage_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_gallery_items_image_idx" ON "homepage_gallery_items" USING btree ("image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_gallery_items" CASCADE;
  ALTER TABLE "homepage" DROP COLUMN "gallery_eyebrow";
  ALTER TABLE "homepage" DROP COLUMN "gallery_title";
  ALTER TABLE "homepage" DROP COLUMN "gallery_intro";`)
}
