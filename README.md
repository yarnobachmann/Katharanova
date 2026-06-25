# Kathara Nova

Production website for Kathara Nova, built with Next.js App Router, TypeScript, Payload CMS, and PostgreSQL.

## Production Environment

Set these variables in the hosting platform:

```env
DATABASE_URI=postgres://USER:PASSWORD@HOST:5432/kathara_nova?sslmode=require
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=https://katharanova.nl
CONTACT_TO_EMAIL=katharanova@gmail.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mailbox@example.com
SMTP_PASS=replace-with-smtp-password
SMTP_FROM_ADDRESS=mailbox@example.com
SMTP_FROM_NAME=Kathara Nova
```

`DATABASE_URI` should point to an external managed PostgreSQL database. The previous `.local-postgres` folder was only a temporary local development database and should not be used for production.

The contact form and Payload admin forgot-password flow both use the SMTP variables. `SMTP_FROM_ADDRESS` should usually be the same mailbox/domain as `SMTP_USER`; visitor messages use the submitted email as `Reply-To` for reliable delivery.

Only set `PAYLOAD_SEED_PASSWORD` when running `npm run seed`. In production this must be a long random password, because it is used for the seeded admin user if that user does not already exist.

## Commands

```bash
npm run payload:generate
npm run typecheck
npm run lint
npm run build
npm run seed
```

Run `npm run seed` only against the database you intentionally want to fill with the Kathara Nova demo content.

## Local Notes

The app does not start PostgreSQL by itself. For production-style testing, use the same kind of external managed PostgreSQL connection string in your local `.env`.
