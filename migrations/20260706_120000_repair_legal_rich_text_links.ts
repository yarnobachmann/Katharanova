import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const termsContent = sql`'{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Deze pagina is voorbereid zodat je de algemene voorwaarden in de admin kunt invullen.","version":1}]},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Vervang deze tekst door de definitieve voorwaarden voor afspraken, betaling, annulering en aansprakelijkheid.","version":1}]}]}}'::jsonb`

const privacyContent = sql`'{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Deze pagina is voorbereid zodat je de privacyverklaring in de admin kunt invullen.","version":1}]},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Vervang deze tekst door de definitieve uitleg over welke gegevens worden verwerkt, waarom dat gebeurt en hoe lang gegevens worden bewaard.","version":1}]}]}}'::jsonb`

const hasInvalidLink = (column: string) => sql.raw(`"${column}"::text ~ '"type":\\s*"link"' AND "${column}"::text !~ '"url":\\s*"[^"]+"'`)

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "terms_page"
   SET "content" = ${termsContent}
   WHERE "content" IS NULL
      OR (${hasInvalidLink('content')});

  UPDATE "privacy_page"
   SET "content" = ${privacyContent}
   WHERE "content" IS NULL
      OR (${hasInvalidLink('content')});

  UPDATE "_terms_page_v"
   SET "version_content" = ${termsContent}
   WHERE "version_content" IS NULL
      OR (${hasInvalidLink('version_content')});

  UPDATE "_privacy_page_v"
   SET "version_content" = ${privacyContent}
   WHERE "version_content" IS NULL
      OR (${hasInvalidLink('version_content')});`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "terms_page" SET "content" = NULL WHERE "content" = ${termsContent};
  UPDATE "privacy_page" SET "content" = NULL WHERE "content" = ${privacyContent};
  UPDATE "_terms_page_v" SET "version_content" = NULL WHERE "version_content" = ${termsContent};
  UPDATE "_privacy_page_v" SET "version_content" = NULL WHERE "version_content" = ${privacyContent};`)
}
