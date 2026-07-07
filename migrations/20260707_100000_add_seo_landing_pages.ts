import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "seo_landing_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "eyebrow" varchar NOT NULL,
      "intro" varchar NOT NULL,
      "cta_title" varchar DEFAULT 'Kathara Nova in Schoonoord',
      "cta_text" varchar DEFAULT 'Op afspraak in Schoonoord, met begeleiding voor mensen uit Drenthe en omgeving.',
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "seo_landing_pages_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "seo_landing_pages_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "seo_landing_pages_related_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "seo_landing_pages_sections" ADD CONSTRAINT "seo_landing_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "seo_landing_pages_highlights" ADD CONSTRAINT "seo_landing_pages_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "seo_landing_pages_related_links" ADD CONSTRAINT "seo_landing_pages_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "seo_landing_pages_slug_idx" ON "seo_landing_pages" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_updated_at_idx" ON "seo_landing_pages" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_created_at_idx" ON "seo_landing_pages" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_sections_order_idx" ON "seo_landing_pages_sections" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_sections_parent_id_idx" ON "seo_landing_pages_sections" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_highlights_order_idx" ON "seo_landing_pages_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_highlights_parent_id_idx" ON "seo_landing_pages_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_related_links_order_idx" ON "seo_landing_pages_related_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "seo_landing_pages_related_links_parent_id_idx" ON "seo_landing_pages_related_links" USING btree ("_parent_id");

    INSERT INTO "seo_landing_pages" ("title", "slug", "eyebrow", "intro", "seo_meta_title", "seo_meta_description", "updated_at", "created_at")
    SELECT
      'Holistische therapie in Schoonoord',
      'holistische-therapie-schoonoord',
      'Holistische therapie Schoonoord',
      'Kathara Nova begeleidt je met aandacht voor lichaam, emoties, patronen en bewustwording, op afspraak in Schoonoord.',
      'Holistische therapie in Schoonoord | Kathara Nova',
      'Holistische therapie, heling en bewustwording in Schoonoord voor wie vastloopt in klachten, emoties of patronen.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "seo_landing_pages" WHERE "slug" = 'holistische-therapie-schoonoord');

    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 0, "id", 'holistisch-voor-wie', 'Voor wie is holistische therapie bedoeld?', 'Deze begeleiding kan passend zijn als je vastloopt in terugkerende patronen, innerlijke onrust, stress, oude emoties of levensvragen. We kijken niet alleen naar de klacht, maar ook naar wat eronder ligt.'
    FROM "seo_landing_pages" WHERE "slug" = 'holistische-therapie-schoonoord'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 1, "id", 'holistisch-verwachten', 'Wat kun je verwachten?', 'Tijdens een sessie stemmen we af op jouw vraag en werken we in jouw tempo. Afhankelijk van wat nodig is kan de begeleiding bestaan uit transheling, innerlijk werk, systemisch kijken of praktische integratie.'
    FROM "seo_landing_pages" WHERE "slug" = 'holistische-therapie-schoonoord'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 2, "id", 'holistisch-praktisch', 'Praktisch', 'Sessies zijn op afspraak in Schoonoord. Je hoeft vooraf nog niet precies te weten welke vorm past; een eerste vraag stellen is genoeg om samen te kijken wat klopt.'
    FROM "seo_landing_pages" WHERE "slug" = 'holistische-therapie-schoonoord'
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "seo_landing_pages" ("title", "slug", "eyebrow", "intro", "seo_meta_title", "seo_meta_description", "updated_at", "created_at")
    SELECT
      'Trance-healing in Drenthe',
      'trance-healing-drenthe',
      'Trance-healing Drenthe',
      'Bij Kathara Nova in Schoonoord kun je terecht voor transheling: energetisch en bewustzijnsgericht werk in een rustige setting.',
      'Trance-healing in Drenthe | Kathara Nova',
      'Trance-healing en energetische begeleiding in Drenthe voor rust, bewustwording en persoonlijke groei.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "seo_landing_pages" WHERE "slug" = 'trance-healing-drenthe');

    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 0, "id", 'trance-wat', 'Wat is trance-healing?', 'Transheling is een vorm van energetische begeleiding waarbij rust, aandacht en bewustwording centraal staan. De sessie nodigt je uit om te vertragen en te onderzoeken wat gezien of verzacht mag worden.'
    FROM "seo_landing_pages" WHERE "slug" = 'trance-healing-drenthe'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 1, "id", 'trance-wanneer', 'Wanneer kan het passen?', 'Mensen komen vaak met spanning, vermoeidheid, terugkerende emoties, oude overtuigingen of het gevoel vast te zitten. De sessie is bedoeld als ondersteuning bij bewustwording en innerlijke ruimte.'
    FROM "seo_landing_pages" WHERE "slug" = 'trance-healing-drenthe'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 2, "id", 'trance-locatie', 'Locatie en afspraak', 'De praktijk is gevestigd in Schoonoord en werkt op afspraak. Woon je in Drenthe, bijvoorbeeld rond Coevorden of Emmen, dan is de praktijk goed bereikbaar.'
    FROM "seo_landing_pages" WHERE "slug" = 'trance-healing-drenthe'
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "seo_landing_pages" ("title", "slug", "eyebrow", "intro", "seo_meta_title", "seo_meta_description", "updated_at", "created_at")
    SELECT
      'Systeemopstelling in Drenthe',
      'systeemopstelling-drenthe',
      'Systeemopstelling Drenthe',
      'Een opstelling bij Kathara Nova helpt zichtbaar maken welke patronen, loyaliteiten of dynamieken onbewust meebewegen.',
      'Systeemopstelling in Drenthe | Kathara Nova',
      'Systeemopstelling en familieopstelling in Drenthe voor inzicht in patronen, relaties en terugkerende dynamieken.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "seo_landing_pages" WHERE "slug" = 'systeemopstelling-drenthe');

    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 0, "id", 'opstelling-zichtbaar', 'Wat maakt een opstelling zichtbaar?', 'Een systeemopstelling of familieopstelling kan inzicht geven in terugkerende patronen binnen familie, relaties, werk of levensvragen. Wat onbewust meespeelt, krijgt ruimte om gezien te worden.'
    FROM "seo_landing_pages" WHERE "slug" = 'systeemopstelling-drenthe'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 1, "id", 'opstelling-vragen', 'Voor welke vragen?', 'Een opstelling kan passend zijn bij terugkerende relatiepatronen, schuldgevoel, loyaliteit, familiebelasting, keuzes die vastzitten of situaties waarin je merkt dat ratio alleen niet genoeg is.'
    FROM "seo_landing_pages" WHERE "slug" = 'systeemopstelling-drenthe'
    ON CONFLICT ("id") DO NOTHING;
    INSERT INTO "seo_landing_pages_sections" ("_order", "_parent_id", "id", "title", "text")
    SELECT 2, "id", 'opstelling-schoonoord', 'Op afspraak in Schoonoord', 'De begeleiding vindt plaats in een rustige praktijksetting in Schoonoord. Samen formuleren we je vraag en onderzoeken we wat zich op een veilige manier wil laten zien.'
    FROM "seo_landing_pages" WHERE "slug" = 'systeemopstelling-drenthe'
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "seo_landing_pages_highlights" ("_order", "_parent_id", "id", "label")
    SELECT item.order_index, page.id, item.item_id, item.label
    FROM "seo_landing_pages" page
    CROSS JOIN (VALUES
      ('holistische-therapie-schoonoord', 0, 'holistisch-highlight-schoonoord', 'Schoonoord'),
      ('holistische-therapie-schoonoord', 1, 'holistisch-highlight-drenthe', 'Drenthe'),
      ('holistische-therapie-schoonoord', 2, 'holistisch-highlight-afspraak', 'Op afspraak'),
      ('holistische-therapie-schoonoord', 3, 'holistisch-highlight-online', 'Online mogelijk'),
      ('trance-healing-drenthe', 0, 'trance-highlight-transheling', 'Transheling'),
      ('trance-healing-drenthe', 1, 'trance-highlight-schoonoord', 'Schoonoord'),
      ('trance-healing-drenthe', 2, 'trance-highlight-drenthe', 'Drenthe'),
      ('trance-healing-drenthe', 3, 'trance-highlight-rust', 'Rust en bewustwording'),
      ('systeemopstelling-drenthe', 0, 'opstelling-highlight-systeem', 'Systeemopstelling'),
      ('systeemopstelling-drenthe', 1, 'opstelling-highlight-familie', 'Familieopstelling'),
      ('systeemopstelling-drenthe', 2, 'opstelling-highlight-schoonoord', 'Schoonoord'),
      ('systeemopstelling-drenthe', 3, 'opstelling-highlight-drenthe', 'Drenthe')
    ) AS item(slug, order_index, item_id, label)
    WHERE page.slug = item.slug
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "seo_landing_pages_related_links" ("_order", "_parent_id", "id", "label", "href")
    SELECT item.order_index, page.id, item.item_id, item.label, item.href
    FROM "seo_landing_pages" page
    CROSS JOIN (VALUES
      ('holistische-therapie-schoonoord', 0, 'holistisch-link-transheling', 'Transheling', '/transheling'),
      ('holistische-therapie-schoonoord', 1, 'holistisch-link-opstelling', 'Opstelling', '/opstelling'),
      ('holistische-therapie-schoonoord', 2, 'holistisch-link-contact', 'Contact', '/contact'),
      ('trance-healing-drenthe', 0, 'trance-link-transheling', 'Lees meer over transheling', '/transheling'),
      ('trance-healing-drenthe', 1, 'trance-link-tarieven', 'Bekijk tarieven', '/tarieven'),
      ('trance-healing-drenthe', 2, 'trance-link-contact', 'Plan een afspraak', '/contact'),
      ('systeemopstelling-drenthe', 0, 'opstelling-link-opstelling', 'Lees meer over opstellingen', '/opstelling'),
      ('systeemopstelling-drenthe', 1, 'opstelling-link-holistisch', 'Holistische therapie', '/holistische-therapie-schoonoord'),
      ('systeemopstelling-drenthe', 2, 'opstelling-link-contact', 'Contact', '/contact')
    ) AS item(slug, order_index, item_id, label, href)
    WHERE page.slug = item.slug
    ON CONFLICT ("id") DO NOTHING;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "seo_landing_pages_related_links" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages_highlights" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages_sections" CASCADE;
    DROP TABLE IF EXISTS "seo_landing_pages" CASCADE;
  `)
}
