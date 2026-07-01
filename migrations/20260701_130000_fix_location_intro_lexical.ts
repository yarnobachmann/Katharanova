import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const validIntro = sql`'{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"De locatie is bewust rustig gehouden: zachte materialen, natuurlijk licht en genoeg ruimte om even aan te komen voordat we beginnen.","version":1}]},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Tijdens een sessie is er aandacht voor privacy, vertraging en een heldere afstemming op wat jij nodig hebt.","version":1}]}]}}'::jsonb`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "location_page"
   SET "intro" = ${validIntro}
   WHERE "intro" IS NULL
      OR "intro"::text LIKE '%"children":[{"text":%';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "location_page"
   SET "intro" = NULL
   WHERE "intro" = ${validIntro};`)
}
