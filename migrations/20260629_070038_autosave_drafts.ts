import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_hero_meta_items_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_workshops_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__workshops_page_v_version_group_healing_items_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  CREATE TYPE "public"."enum__workshops_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tarieven_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tarieven_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_contact_cards_icon" AS ENUM('clock', 'mail', 'heart', 'heart-handshake', 'map-pin', 'shield', 'sparkles', 'phone', 'users');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_terms_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__terms_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_privacy_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "gallery_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_hero_meta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__homepage_v_version_hero_meta_items_icon" DEFAULT 'map-pin',
  	"label" varchar,
  	"order" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_recognition_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_chip_text" varchar,
  	"version_recognition_title" varchar,
  	"version_recognition_intro" varchar,
  	"version_treatments_eyebrow" varchar,
  	"version_treatments_title" varchar,
  	"version_treatments_intro" varchar,
  	"version_about_eyebrow" varchar,
  	"version_about_title" varchar,
  	"version_about_text" varchar,
  	"version_about_image_id" integer,
  	"version_quote" varchar,
  	"version_workshop_preview_eyebrow" varchar,
  	"version_workshop_preview_title" varchar,
  	"version_workshop_preview_intro" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_primary_href" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_secondary_href" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"hero_image_id" integer,
  	"_status" "enum_gallery_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_gallery_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version__status" "enum__gallery_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_about_page_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_page_v_version_method_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_page_v_version_for_who" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_portrait_id" integer,
  	"version_intro_title" varchar,
  	"version_intro" jsonb,
  	"version_vision_title" varchar,
  	"version_vision" jsonb,
  	"version_working_method_title" varchar,
  	"version_working_method" jsonb,
  	"version_for_who_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_primary_href" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_secondary_href" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_workshops_page_v_version_group_healing_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__workshops_page_v_version_group_healing_items_icon" DEFAULT 'users',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_workshops_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_group_healing_eyebrow" varchar,
  	"version_group_healing_title" varchar,
  	"version_group_healing_text" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_primary_href" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_secondary_href" varchar,
  	"version__status" "enum__workshops_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_primary_href" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_secondary_href" varchar,
  	"version__status" "enum__blog_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_tarieven_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_faq_eyebrow" varchar,
  	"version_faq_title" varchar,
  	"version_faq_intro" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_primary_label" varchar,
  	"version_cta_primary_href" varchar,
  	"version_cta_secondary_label" varchar,
  	"version_cta_secondary_href" varchar,
  	"version__status" "enum__tarieven_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_contact_page_v_version_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__contact_page_v_version_contact_cards_icon" DEFAULT 'mail',
  	"label" varchar,
  	"value" varchar,
  	"order" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_image_id" integer,
  	"version_form_intro" varchar,
  	"version_availability_text" varchar,
  	"version_image_id" integer,
  	"version_quote" varchar,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "terms_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"content" jsonb,
  	"_status" "enum_terms_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_terms_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_content" jsonb,
  	"version__status" "enum__terms_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"content" jsonb,
  	"_status" "enum_privacy_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_privacy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_content" jsonb,
  	"version__status" "enum__privacy_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "treatments" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "treatments" ALTER COLUMN "tone" SET DEFAULT 'cream'::text;
  DROP TYPE "public"."enum_treatments_tone";
  CREATE TYPE "public"."enum_treatments_tone" AS ENUM('cream', 'sage', 'clay', 'sand');
  ALTER TABLE "treatments" ALTER COLUMN "tone" SET DEFAULT 'cream'::"public"."enum_treatments_tone";
  ALTER TABLE "treatments" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_treatments_tone" USING "tone"::"public"."enum_treatments_tone";
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_tone" SET DATA TYPE text;
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_tone" SET DEFAULT 'cream'::text;
  DROP TYPE "public"."enum__treatments_v_version_tone";
  CREATE TYPE "public"."enum__treatments_v_version_tone" AS ENUM('cream', 'sage', 'clay', 'sand');
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_tone" SET DEFAULT 'cream'::"public"."enum__treatments_v_version_tone";
  ALTER TABLE "_treatments_v" ALTER COLUMN "version_tone" SET DATA TYPE "public"."enum__treatments_v_version_tone" USING "version_tone"::"public"."enum__treatments_v_version_tone";
  ALTER TABLE "blog_posts" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "blog_posts" ALTER COLUMN "tone" SET DEFAULT 'cream'::text;
  DROP TYPE "public"."enum_blog_posts_tone";
  CREATE TYPE "public"."enum_blog_posts_tone" AS ENUM('cream', 'sage', 'clay', 'sand');
  ALTER TABLE "blog_posts" ALTER COLUMN "tone" SET DEFAULT 'cream'::"public"."enum_blog_posts_tone";
  ALTER TABLE "blog_posts" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_blog_posts_tone" USING "tone"::"public"."enum_blog_posts_tone";
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "version_tone" SET DATA TYPE text;
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "version_tone" SET DEFAULT 'cream'::text;
  DROP TYPE "public"."enum__blog_posts_v_version_tone";
  CREATE TYPE "public"."enum__blog_posts_v_version_tone" AS ENUM('cream', 'sage', 'clay', 'sand');
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "version_tone" SET DEFAULT 'cream'::"public"."enum__blog_posts_v_version_tone";
  ALTER TABLE "_blog_posts_v" ALTER COLUMN "version_tone" SET DATA TYPE "public"."enum__blog_posts_v_version_tone" USING "version_tone"::"public"."enum__blog_posts_v_version_tone";
  ALTER TABLE "pricing_items" ALTER COLUMN "tone" SET DATA TYPE text;
  ALTER TABLE "pricing_items" ALTER COLUMN "tone" SET DEFAULT 'cream'::text;
  DROP TYPE "public"."enum_pricing_items_tone";
  CREATE TYPE "public"."enum_pricing_items_tone" AS ENUM('cream', 'sage', 'clay', 'sand');
  ALTER TABLE "pricing_items" ALTER COLUMN "tone" SET DEFAULT 'cream'::"public"."enum_pricing_items_tone";
  ALTER TABLE "pricing_items" ALTER COLUMN "tone" SET DATA TYPE "public"."enum_pricing_items_tone" USING "tone"::"public"."enum_pricing_items_tone";
  ALTER TABLE "site_settings" ALTER COLUMN "location" SET DEFAULT 'Op afspraak - Nederland';
  ALTER TABLE "site_settings" ALTER COLUMN "copyright" SET DEFAULT 'Kathara Nova - Heling & Bewustwording';
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "homepage_recognition_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "about_page_method_steps" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "about_page_method_steps" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "about_page_for_who" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "_treatments_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
  ALTER TABLE "_workshops_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
  ALTER TABLE "_blog_posts_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gallery_photos_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "kvk_text" varchar DEFAULT 'KvK 00000000';
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "_status" "enum_homepage_status" DEFAULT 'draft';
  ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "_status" "enum_about_page_status" DEFAULT 'draft';
  ALTER TABLE "workshops_page" ADD COLUMN IF NOT EXISTS "_status" "enum_workshops_page_status" DEFAULT 'draft';
  ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "_status" "enum_blog_page_status" DEFAULT 'draft';
  ALTER TABLE "tarieven_page" ADD COLUMN IF NOT EXISTS "_status" "enum_tarieven_page_status" DEFAULT 'draft';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "_status" "enum_contact_page_status" DEFAULT 'draft';
  ALTER TABLE "gallery_page" ADD COLUMN IF NOT EXISTS "_status" "enum_gallery_page_status" DEFAULT 'draft';
  ALTER TABLE "terms_page" ADD COLUMN IF NOT EXISTS "_status" "enum_terms_page_status" DEFAULT 'draft';
  ALTER TABLE "privacy_page" ADD COLUMN IF NOT EXISTS "_status" "enum_privacy_page_status" DEFAULT 'draft';
  DO $$ BEGIN
    ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  ALTER TABLE "_homepage_v_version_hero_meta_items" ADD CONSTRAINT "_homepage_v_version_hero_meta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_recognition_items" ADD CONSTRAINT "_homepage_v_version_recognition_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  DO $$ BEGIN
    ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  ALTER TABLE "_gallery_page_v" ADD CONSTRAINT "_gallery_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_stats" ADD CONSTRAINT "_about_page_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_method_steps" ADD CONSTRAINT "_about_page_v_version_method_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_for_who" ADD CONSTRAINT "_about_page_v_version_for_who_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_page_v_version_group_healing_items" ADD CONSTRAINT "_workshops_page_v_version_group_healing_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_workshops_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_page_v" ADD CONSTRAINT "_workshops_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_v" ADD CONSTRAINT "_blog_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tarieven_page_v" ADD CONSTRAINT "_tarieven_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_contact_cards" ADD CONSTRAINT "_contact_page_v_version_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "gallery_photos_image_idx" ON "gallery_photos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "gallery_photos_updated_at_idx" ON "gallery_photos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gallery_photos_created_at_idx" ON "gallery_photos" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_hero_meta_items_order_idx" ON "_homepage_v_version_hero_meta_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_hero_meta_items_parent_id_idx" ON "_homepage_v_version_hero_meta_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_recognition_items_order_idx" ON "_homepage_v_version_recognition_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_recognition_items_parent_id_idx" ON "_homepage_v_version_recognition_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_hero_version_hero_image_idx" ON "_homepage_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_version_about_image_idx" ON "_homepage_v" USING btree ("version_about_image_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_homepage_v_autosave_idx" ON "_homepage_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "gallery_page_hero_hero_image_idx" ON "gallery_page" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "gallery_page__status_idx" ON "gallery_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_version_hero_version_hero_image_idx" ON "_gallery_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_version_version__status_idx" ON "_gallery_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_created_at_idx" ON "_gallery_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_updated_at_idx" ON "_gallery_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_latest_idx" ON "_gallery_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_autosave_idx" ON "_gallery_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_stats_order_idx" ON "_about_page_v_version_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_stats_parent_id_idx" ON "_about_page_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_method_steps_order_idx" ON "_about_page_v_version_method_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_method_steps_parent_id_idx" ON "_about_page_v_version_method_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_for_who_order_idx" ON "_about_page_v_version_for_who" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_for_who_parent_id_idx" ON "_about_page_v_version_for_who" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version_portrait_idx" ON "_about_page_v" USING btree ("version_portrait_id");
  CREATE INDEX IF NOT EXISTS "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_version_group_healing_items_order_idx" ON "_workshops_page_v_version_group_healing_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_version_group_healing_items_parent_id_idx" ON "_workshops_page_v_version_group_healing_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_version_hero_version_hero_image_idx" ON "_workshops_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_version_version__status_idx" ON "_workshops_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_created_at_idx" ON "_workshops_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_updated_at_idx" ON "_workshops_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_latest_idx" ON "_workshops_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_workshops_page_v_autosave_idx" ON "_workshops_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_version_hero_version_hero_image_idx" ON "_blog_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_version_version__status_idx" ON "_blog_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_created_at_idx" ON "_blog_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_updated_at_idx" ON "_blog_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_latest_idx" ON "_blog_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_page_v_autosave_idx" ON "_blog_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_version_hero_version_hero_image_idx" ON "_tarieven_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_version_version__status_idx" ON "_tarieven_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_created_at_idx" ON "_tarieven_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_updated_at_idx" ON "_tarieven_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_latest_idx" ON "_tarieven_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_tarieven_page_v_autosave_idx" ON "_tarieven_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_version_contact_cards_order_idx" ON "_contact_page_v_version_contact_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_version_contact_cards_parent_id_idx" ON "_contact_page_v_version_contact_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_version_hero_version_hero_image_idx" ON "_contact_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_version_version_image_idx" ON "_contact_page_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "terms_page__status_idx" ON "terms_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_terms_page_v_version_version__status_idx" ON "_terms_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_terms_page_v_created_at_idx" ON "_terms_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_terms_page_v_updated_at_idx" ON "_terms_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_terms_page_v_latest_idx" ON "_terms_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_terms_page_v_autosave_idx" ON "_terms_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "privacy_page__status_idx" ON "privacy_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_privacy_page_v_version_version__status_idx" ON "_privacy_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_privacy_page_v_created_at_idx" ON "_privacy_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_privacy_page_v_updated_at_idx" ON "_privacy_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_privacy_page_v_latest_idx" ON "_privacy_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_privacy_page_v_autosave_idx" ON "_privacy_page_v" USING btree ("autosave");
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk" FOREIGN KEY ("gallery_photos_id") REFERENCES "public"."gallery_photos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "_treatments_v_autosave_idx" ON "_treatments_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_workshops_v_autosave_idx" ON "_workshops_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_autosave_idx" ON "_blog_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_photos_id");
  CREATE INDEX IF NOT EXISTS "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "workshops_page__status_idx" ON "workshops_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "blog_page__status_idx" ON "blog_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "tarieven_page__status_idx" ON "tarieven_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "contact_page__status_idx" ON "contact_page" USING btree ("_status");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_treatments_tone" ADD VALUE 'dark';
  ALTER TYPE "public"."enum__treatments_v_version_tone" ADD VALUE 'dark';
  ALTER TYPE "public"."enum_blog_posts_tone" ADD VALUE 'dark';
  ALTER TYPE "public"."enum__blog_posts_v_version_tone" ADD VALUE 'dark';
  ALTER TYPE "public"."enum_pricing_items_tone" ADD VALUE 'dark';
  ALTER TABLE "gallery_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_hero_meta_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_recognition_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_method_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_for_who" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_workshops_page_v_version_group_healing_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_workshops_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tarieven_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_contact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_terms_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "privacy_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_privacy_page_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery_photos" CASCADE;
  DROP TABLE "_homepage_v_version_hero_meta_items" CASCADE;
  DROP TABLE "_homepage_v_version_recognition_items" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "gallery_page" CASCADE;
  DROP TABLE "_gallery_page_v" CASCADE;
  DROP TABLE "_about_page_v_version_stats" CASCADE;
  DROP TABLE "_about_page_v_version_method_steps" CASCADE;
  DROP TABLE "_about_page_v_version_for_who" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_workshops_page_v_version_group_healing_items" CASCADE;
  DROP TABLE "_workshops_page_v" CASCADE;
  DROP TABLE "_blog_page_v" CASCADE;
  DROP TABLE "_tarieven_page_v" CASCADE;
  DROP TABLE "_contact_page_v_version_contact_cards" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "terms_page" CASCADE;
  DROP TABLE "_terms_page_v" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "_privacy_page_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk";
  
  DROP INDEX "_treatments_v_autosave_idx";
  DROP INDEX "_workshops_v_autosave_idx";
  DROP INDEX "_blog_posts_v_autosave_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_photos_id_idx";
  DROP INDEX "homepage__status_idx";
  DROP INDEX "about_page__status_idx";
  DROP INDEX "workshops_page__status_idx";
  DROP INDEX "blog_page__status_idx";
  DROP INDEX "tarieven_page__status_idx";
  DROP INDEX "contact_page__status_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "location" SET DEFAULT 'Op afspraak · Nederland';
  ALTER TABLE "site_settings" ALTER COLUMN "copyright" SET DEFAULT 'Kathara Nova · Heling & Bewustwording';
  ALTER TABLE "homepage_hero_meta_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "homepage_recognition_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "about_page_method_steps" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "about_page_method_steps" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "about_page_for_who" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "_treatments_v" DROP COLUMN "autosave";
  ALTER TABLE "_workshops_v" DROP COLUMN "autosave";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "autosave";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_photos_id";
  ALTER TABLE "site_settings" DROP COLUMN "kvk_text";
  ALTER TABLE "homepage" DROP COLUMN "_status";
  ALTER TABLE "about_page" DROP COLUMN "_status";
  ALTER TABLE "workshops_page" DROP COLUMN "_status";
  ALTER TABLE "blog_page" DROP COLUMN "_status";
  ALTER TABLE "tarieven_page" DROP COLUMN "_status";
  ALTER TABLE "contact_page" DROP COLUMN "_status";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_hero_meta_items_icon";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum_gallery_page_status";
  DROP TYPE "public"."enum__gallery_page_v_version_status";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_workshops_page_status";
  DROP TYPE "public"."enum__workshops_page_v_version_group_healing_items_icon";
  DROP TYPE "public"."enum__workshops_page_v_version_status";
  DROP TYPE "public"."enum_blog_page_status";
  DROP TYPE "public"."enum__blog_page_v_version_status";
  DROP TYPE "public"."enum_tarieven_page_status";
  DROP TYPE "public"."enum__tarieven_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_contact_cards_icon";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum_terms_page_status";
  DROP TYPE "public"."enum__terms_page_v_version_status";
  DROP TYPE "public"."enum_privacy_page_status";
  DROP TYPE "public"."enum__privacy_page_v_version_status";`)
}

