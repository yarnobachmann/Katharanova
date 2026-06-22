import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_treatments_icon" AS ENUM('sparkles', 'git-fork', 'heart-handshake', 'heart', 'shield');
  CREATE TYPE "public"."enum__treatments_v_version_icon" AS ENUM('sparkles', 'git-fork', 'heart-handshake', 'heart', 'shield');
  CREATE TYPE "public"."enum_workshops_page_group_healing_items_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  CREATE TYPE "public"."enum_contact_page_contact_cards_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  CREATE TABLE "about_page_method_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric DEFAULT 0
  );
  
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DEFAULT 'map-pin'::text;
  DROP TYPE "public"."enum_homepage_hero_meta_items_icon";
  CREATE TYPE "public"."enum_homepage_hero_meta_items_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DEFAULT 'map-pin'::"public"."enum_homepage_hero_meta_items_icon";
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_homepage_hero_meta_items_icon" USING "icon"::"public"."enum_homepage_hero_meta_items_icon";
  ALTER TABLE "treatments" ALTER COLUMN "icon" SET DEFAULT 'sparkles'::"public"."enum_treatments_icon";
  ALTER TABLE "treatments" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_treatments_icon" USING "icon"::"public"."enum_treatments_icon";
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_icon" SET DEFAULT 'sparkles'::"public"."enum__treatments_v_version_icon";
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_icon" SET DATA TYPE "public"."enum__treatments_v_version_icon" USING "version_icon"::"public"."enum__treatments_v_version_icon";
  ALTER TABLE "workshops_page_group_healing_items" ALTER COLUMN "icon" SET DEFAULT 'users'::"public"."enum_workshops_page_group_healing_items_icon";
  ALTER TABLE "workshops_page_group_healing_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_workshops_page_group_healing_items_icon" USING "icon"::"public"."enum_workshops_page_group_healing_items_icon";
  ALTER TABLE "contact_page_contact_cards" ALTER COLUMN "icon" SET DEFAULT 'mail'::"public"."enum_contact_page_contact_cards_icon";
  ALTER TABLE "contact_page_contact_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_contact_page_contact_cards_icon" USING "icon"::"public"."enum_contact_page_contact_cards_icon";
  ALTER TABLE "about_page_method_steps" ADD CONSTRAINT "about_page_method_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_method_steps_order_idx" ON "about_page_method_steps" USING btree ("_order");
  CREATE INDEX "about_page_method_steps_parent_id_idx" ON "about_page_method_steps" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page_method_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_method_steps" CASCADE;
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DEFAULT 'map-pin'::text;
  DROP TYPE "public"."enum_homepage_hero_meta_items_icon";
  CREATE TYPE "public"."enum_homepage_hero_meta_items_icon" AS ENUM('map-pin', 'clock', 'heart', 'sparkles');
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DEFAULT 'map-pin'::"public"."enum_homepage_hero_meta_items_icon";
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_homepage_hero_meta_items_icon" USING "icon"::"public"."enum_homepage_hero_meta_items_icon";
  ALTER TABLE "treatments" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "treatments" ALTER COLUMN "icon" SET DEFAULT 'sparkles';
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_icon" SET DATA TYPE varchar;
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_icon" SET DEFAULT 'sparkles';
  ALTER TABLE "workshops_page_group_healing_items" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "workshops_page_group_healing_items" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "contact_page_contact_cards" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "contact_page_contact_cards" ALTER COLUMN "icon" DROP DEFAULT;
  DROP TYPE "public"."enum_treatments_icon";
  DROP TYPE "public"."enum__treatments_v_version_icon";
  DROP TYPE "public"."enum_workshops_page_group_healing_items_icon";
  DROP TYPE "public"."enum_contact_page_contact_cards_icon";`)
}
