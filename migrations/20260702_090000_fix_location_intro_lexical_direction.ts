import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const validIntro = sql`'{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"De locatie is bewust rustig gehouden: zachte materialen, natuurlijk licht en genoeg ruimte om even aan te komen voordat we beginnen.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"textFormat":0,"textStyle":"","type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Tijdens een sessie is er aandacht voor privacy, vertraging en een heldere afstemming op wat jij nodig hebt.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"textFormat":0,"textStyle":"","type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'::jsonb`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "location_page"
   SET "intro" = ${validIntro}
   WHERE "intro" IS NULL
      OR "intro" #>> '{root,direction}' IS DISTINCT FROM 'ltr'
      OR "intro" #>> '{root,children,0,direction}' IS DISTINCT FROM 'ltr';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "location_page"
   SET "intro" = NULL
   WHERE "intro" = ${validIntro};`)
}
