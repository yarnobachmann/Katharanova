import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "site_title" = 'Holistische therapie in Schoonoord | Kathara Nova',
      "site_description" = 'Holistische therapie, transheling, opstellingen en bewustwording in Schoonoord, Drenthe.',
      "location" = 'Op afspraak · Schoonoord',
      "footer_text" = 'Een warme praktijk in Schoonoord voor holistische therapie, transheling, opstellingen en bewustwording. Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.',
      "updated_at" = now();

    UPDATE "homepage"
    SET
      "hero_eyebrow" = 'Holistische therapie in Schoonoord',
      "hero_title" = 'Vastgelopen in patronen, spanning of levensvragen?',
      "hero_intro" = 'Kathara Nova begeleidt je in Schoonoord met transheling, opstellingen en innerlijk werk naar meer rust, inzicht en bewustwording.',
      "recognition_intro" = 'Dat kan zich uiten in spanning, terugkerende emoties, oude overtuigingen, innerlijke onrust of patronen die steeds opnieuw terugkomen.',
      "treatments_title" = 'Transheling, opstellingen en innerlijk werk',
      "treatments_intro" = 'Drie vormen van holistische begeleiding in Schoonoord, afgestemd op waar jij nu staat.',
      "about_text" = 'Bij Kathara Nova wordt niet alleen gekeken naar wat zichtbaar speelt, maar ook naar de patronen en overtuigingen eronder. De begeleiding ondersteunt bewustwording, rust, richting en verandering.',
      "workshop_preview_title" = 'Workshops persoonlijke groei in Schoonoord',
      "cta_text" = 'Je hoeft nog niet precies te weten wat je nodig hebt. Een eerste vraag stellen is genoeg om samen te kijken welke begeleiding passend is.',
      "_status" = 'published',
      "updated_at" = now();

    DELETE FROM "homepage_hero_meta_items";

    INSERT INTO "homepage_hero_meta_items" ("_order", "_parent_id", "id", "icon", "label", "order")
    SELECT 0, "id", 'schoonoord-drenthe', 'map-pin', 'Schoonoord, Drenthe', 1
    FROM "homepage";

    INSERT INTO "homepage_hero_meta_items" ("_order", "_parent_id", "id", "icon", "label", "order")
    SELECT 1, "id", 'sessies-60-90-min', 'clock', 'Sessies 60-90 min', 2
    FROM "homepage";

    DELETE FROM "homepage_recognition_items";

    INSERT INTO "homepage_recognition_items" ("_order", "_parent_id", "id", "label", "order")
    SELECT 0, "id", 'spanning-klachten-aandacht', 'Spanning of klachten waar je met aandacht naar wilt kijken', 1
    FROM "homepage";

    INSERT INTO "homepage_recognition_items" ("_order", "_parent_id", "id", "label", "order")
    SELECT 1, "id", 'terugkerende-emoties', 'Terugkerende emoties die om aandacht vragen', 2
    FROM "homepage";

    INSERT INTO "homepage_recognition_items" ("_order", "_parent_id", "id", "label", "order")
    SELECT 2, "id", 'oude-overtuigingen', 'Oude overtuigingen die je tegenhouden', 3
    FROM "homepage";

    INSERT INTO "homepage_recognition_items" ("_order", "_parent_id", "id", "label", "order")
    SELECT 3, "id", 'innerlijke-onrust-patronen', 'Innerlijke onrust en patronen die zich herhalen', 4
    FROM "homepage";

    UPDATE "treatments"
    SET
      "summary" = 'Energetisch en bewustzijnsgericht werk dat ondersteunt bij ontspanning, bewustwording en innerlijke ruimte.',
      "intro" = 'Energetisch en bewustzijnsgericht werk dat ondersteunt bij ontspanning, bewustwording en innerlijke ruimte.',
      "seo_meta_title" = 'Transheling in Drenthe | Kathara Nova',
      "seo_meta_description" = 'Transheling en energetische begeleiding voor rust, bewustwording en persoonlijke groei bij Kathara Nova in Drenthe.',
      "updated_at" = now()
    WHERE "slug" = 'transheling';

    UPDATE "treatments"
    SET
      "seo_meta_title" = 'Systeemopstelling in Drenthe | Kathara Nova',
      "seo_meta_description" = 'Krijg inzicht in familiepatronen, relaties en terugkerende dynamieken met een opstelling bij Kathara Nova.',
      "updated_at" = now()
    WHERE "slug" = 'opstelling';

    UPDATE "treatments"
    SET
      "seo_meta_title" = 'Innerlijk werk en overtuigingen transformeren | Kathara Nova',
      "seo_meta_description" = 'Begeleiding bij belemmerende overtuigingen, emoties en persoonlijke groei bij Kathara Nova in Schoonoord.',
      "updated_at" = now()
    WHERE "slug" = 'innerlijke-werk';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "site_title" = 'Kathara Nova - Holistische therapie, heling & bewustwording',
      "site_description" = 'Een warme praktijk voor holistische therapie, heling en bewustwording.',
      "location" = 'Op afspraak · Nederland',
      "footer_text" = 'Een warme praktijk voor holistische therapie, heling en bewustwording. Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.',
      "updated_at" = now();

    UPDATE "homepage"
    SET
      "hero_eyebrow" = 'Holistische therapie · heling & bewustwording',
      "hero_title" = 'Vastgelopen in patronen, klachten of levensvragen?',
      "hero_intro" = 'Kathara Nova begeleidt je met holistische therapie, heling en bewustwording naar meer rust, inzicht en innerlijke vrijheid.',
      "recognition_intro" = 'Dat kan zich uiten in chronische klachten, terugkerende emoties, oude overtuigingen, innerlijke onrust of patronen die steeds opnieuw terugkomen.',
      "treatments_title" = 'Werk dat je weer in beweging brengt',
      "treatments_intro" = 'Drie wegen naar heling en bewustwording, afgestemd op waar jij nu staat.',
      "about_text" = 'Bij Kathara Nova wordt niet alleen gekeken naar de klacht, maar naar wat eronder ligt. De begeleiding helpt je bewust worden van patronen, zodat er ruimte ontstaat voor rust, richting en verandering.',
      "workshop_preview_title" = 'Samen helen in een kleine groep',
      "cta_text" = 'Je hoeft nog niet precies te weten wat je nodig hebt. Een eerste vraag stellen is genoeg.',
      "updated_at" = now();
  `)
}
