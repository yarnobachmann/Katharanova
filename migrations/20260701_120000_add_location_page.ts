import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "location_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"hero_image_id" integer,
  	"intro_title" varchar,
  	"intro" jsonb,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_primary_label" varchar,
  	"cta_primary_href" varchar,
  	"cta_secondary_label" varchar,
  	"cta_secondary_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "location_page_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS "location_page_text_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"order" numeric DEFAULT 0
  );

  DO $$ BEGIN
    ALTER TABLE "location_page" ADD CONSTRAINT "location_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "location_page_carousel_items" ADD CONSTRAINT "location_page_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."location_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "location_page_carousel_items" ADD CONSTRAINT "location_page_carousel_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "location_page_text_blocks" ADD CONSTRAINT "location_page_text_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."location_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  CREATE INDEX IF NOT EXISTS "location_page_hero_hero_image_idx" ON "location_page" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "location_page_carousel_items_order_idx" ON "location_page_carousel_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "location_page_carousel_items_parent_id_idx" ON "location_page_carousel_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "location_page_carousel_items_image_idx" ON "location_page_carousel_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "location_page_text_blocks_order_idx" ON "location_page_text_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "location_page_text_blocks_parent_id_idx" ON "location_page_text_blocks" USING btree ("_parent_id");

  INSERT INTO "location_page" (
    "hero_eyebrow",
    "hero_title",
    "hero_intro",
    "intro_title",
    "intro",
    "cta_title",
    "cta_text",
    "cta_primary_label",
    "cta_primary_href",
    "cta_secondary_label",
    "cta_secondary_href",
    "updated_at",
    "created_at"
  )
  SELECT
    'Locatie',
    'Een rustige plek om te landen',
    'De praktijkruimte is ingericht als een warme, stille bedding voor sessies, opstellingen en verdiepende begeleiding.',
    'Welkom in de praktijk',
    '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"De locatie is bewust rustig gehouden: zachte materialen, natuurlijk licht en genoeg ruimte om even aan te komen voordat we beginnen.","version":1}]},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Tijdens een sessie is er aandacht voor privacy, vertraging en een heldere afstemming op wat jij nodig hebt.","version":1}]}]}}'::jsonb,
    'Wil je weten of een sessie op locatie past?',
    'Stel gerust je vraag. Ik denk graag met je mee over wat praktisch en inhoudelijk klopt.',
    'Neem contact op',
    '/contact',
    'Bekijk tarieven',
    '/tarieven',
    now(),
    now()
  WHERE NOT EXISTS (SELECT 1 FROM "location_page");

  INSERT INTO "location_page_text_blocks" ("_order", "_parent_id", "id", "title", "text", "order")
  SELECT 0, "location_page"."id", 'bereikbaarheid', 'Bereikbaarheid', 'De praktijk is op afspraak geopend. Na het plannen ontvang je de exacte adresgegevens en praktische informatie voor je bezoek.', 1
  FROM "location_page"
  WHERE NOT EXISTS (SELECT 1 FROM "location_page_text_blocks")
  ORDER BY "id"
  LIMIT 1;

  INSERT INTO "location_page_text_blocks" ("_order", "_parent_id", "id", "title", "text", "order")
  SELECT 1, "location_page"."id", 'online-of-op-locatie', 'Online of op locatie', 'Een deel van de begeleiding kan ook online plaatsvinden. We kijken samen wat passend is voor jouw vraag en situatie.', 2
  FROM "location_page"
  WHERE NOT EXISTS (SELECT 1 FROM "location_page_text_blocks" WHERE "id" = 'online-of-op-locatie')
  ORDER BY "id"
  LIMIT 1;

  INSERT INTO "location_page_text_blocks" ("_order", "_parent_id", "id", "title", "text", "order")
  SELECT 2, "location_page"."id", 'aankomen-in-rust', 'Aankomen in rust', 'Plan als het kan wat ruimte rondom je afspraak, zodat je niet gehaast hoeft binnen te komen of direct weer door hoeft.', 3
  FROM "location_page"
  WHERE NOT EXISTS (SELECT 1 FROM "location_page_text_blocks" WHERE "id" = 'aankomen-in-rust')
  ORDER BY "id"
  LIMIT 1;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "location_page_text_blocks" CASCADE;
  DROP TABLE "location_page_carousel_items" CASCADE;
  DROP TABLE "location_page" CASCADE;`)
}
