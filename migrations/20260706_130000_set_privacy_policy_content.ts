import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const privacyText = `Privacyverklaring
Praktijk Kathara Nova
Versie: 7-07-2026
Bij Praktijk Kathara Nova hecht ik veel waarde aan jouw privacy. Ik ga zorgvuldig om met jouw persoonsgegevens en zorg ervoor dat deze vertrouwelijk worden behandeld. In deze privacyverklaring lees je welke gegevens ik verzamel, waarom ik deze nodig heb en welke rechten je hebt.
1. Welke persoonsgegevens verwerk ik?
Wanneer je contact met mij opneemt of gebruikmaakt van mijn diensten, kan ik de volgende gegevens verwerken:
Voor- en achternaam
Adresgegevens (indien nodig voor facturatie)
Telefoonnummer
E-mailadres
Geboortedatum (indien relevant voor de begeleiding)
Gegevens over jouw hulpvraag
Notities die tijdens sessies worden gemaakt
Factuurgegevens
Ik verwerk uitsluitend gegevens die noodzakelijk zijn voor een goede begeleiding en administratie.
2. Waarom verwerk ik jouw gegevens?
Ik gebruik jouw persoonsgegevens om:
afspraken te plannen;
contact met je op te nemen;
behandelingen en begeleiding goed uit te voeren;
een cliëntendossier bij te houden;
facturen te versturen;
te voldoen aan wettelijke verplichtingen, zoals de belastingwetgeving.
3. Bijzondere persoonsgegevens
Tijdens sessies kunnen persoonlijke of gevoelige gegevens worden besproken. Deze informatie wordt vertrouwelijk behandeld en alleen vastgelegd wanneer dit noodzakelijk is voor de begeleiding.
4. Bewaartermijn
Ik bewaar jouw gegevens niet langer dan noodzakelijk is.
Administratieve gegevens en facturen worden volgens de wettelijke bewaarplicht 7 jaar bewaard.
Cliëntdossiers worden maximaal 5 jaar na de laatste afspraak bewaard, tenzij een langere bewaartermijn wettelijk verplicht is of jij toestemming geeft.
5. Delen van persoonsgegevens
Jouw gegevens worden niet verkocht of verstrekt aan derden.
Gegevens worden alleen gedeeld wanneer:
jij hiervoor schriftelijk toestemming hebt gegeven;
dit wettelijk verplicht is;
dit noodzakelijk is voor de uitvoering van de overeenkomst (bijvoorbeeld met een boekhouder die een geheimhoudingsplicht heeft).
6. Beveiliging
Ik neem passende maatregelen om jouw persoonsgegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
Onder andere door:
beveiligde apparatuur;
sterke wachtwoorden;
beveiligde e-mail waar mogelijk;
beperkte toegang tot persoonsgegevens.
7. Website
Wanneer je mijn website bezoekt, kunnen technische gegevens zoals IP-adres, browsergegevens en cookies worden verwerkt.
Cookies
Mijn website gebruikt uitsluitend functionele en eventueel analytische cookies die geen inbreuk maken op jouw privacy.
Indien ik gebruikmaak van marketingcookies of trackingcookies, zal hiervoor eerst toestemming worden gevraagd.
8. Jouw rechten
Je hebt het recht om:
jouw gegevens in te zien;
jouw gegevens te laten corrigeren;
jouw gegevens te laten verwijderen (voor zover wettelijk toegestaan);
bezwaar te maken tegen de verwerking;
jouw toestemming in te trekken;
jouw gegevens over te laten dragen.
Wil je hiervan gebruikmaken? Neem dan contact met mij op via de onderstaande gegevens.
9. Klachten
Heb je een klacht over de verwerking van jouw persoonsgegevens? Dan hoor ik dat graag zodat we samen tot een oplossing kunnen komen.
Je hebt daarnaast het recht een klacht in te dienen bij de:
Autoriteit Persoonsgegevens
https://www.autoriteitpersoonsgegevens.nl
10. Contact
Heb je vragen over deze privacyverklaring of over de verwerking van jouw persoonsgegevens?
Neem gerust contact op.`

const textToLexical = (text: string) => ({
  root: {
    children: text.split('\n').filter(Boolean).map((paragraph) => ({
      children: [
        {
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: paragraph,
          type: 'text',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      textStyle: '',
      type: 'paragraph',
      version: 1
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1
  }
})

const privacyContent = sql.raw(`'${JSON.stringify(textToLexical(privacyText)).replace(/'/g, "''")}'::jsonb`)

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "privacy_page"
   SET
    "hero_eyebrow" = 'Privacy',
    "hero_title" = 'Privacyverklaring',
    "hero_intro" = 'Hier lees je hoe Kathara Nova omgaat met persoonsgegevens en vertrouwelijke informatie.',
    "content" = ${privacyContent},
    "updated_at" = now();

  UPDATE "_privacy_page_v"
   SET "version_content" = ${privacyContent}
   WHERE "latest" = true OR "autosave" = true;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "privacy_page" SET "content" = NULL WHERE "content" = ${privacyContent};
  UPDATE "_privacy_page_v" SET "version_content" = NULL WHERE "version_content" = ${privacyContent};`)
}
