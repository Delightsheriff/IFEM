# IFEM Education

The public website and Sanity Studio for IFEM Education, a Nigerian UK-study consultancy.

## Local setup

1. Install Node.js 24 or later and run `npm install`.
2. Copy `.env.example` to `.env.local` and provide the required values.
3. Start the site with `npm run dev` and open `http://localhost:3000`.
4. Open `/studio` to manage content in Sanity.

## Environment

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` connect the site to Sanity.
- `SANITY_API_TOKEN` is required only for content-seeding scripts.
- `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` enable contact email delivery.
- `TURNSTILE_ENABLED`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and `TURNSTILE_SECRET_KEY` protect the contact form.
- `CONTACT_EMAIL_ROTATION_ENABLED=true` rotates new enquiries across branch emails configured in Sanity.
- `NEWSLETTER_ENABLED=false` keeps the reserved newsletter endpoint unavailable until an email-list provider is ready.

Never commit `.env.local` or credentials.

## Verification

Run these before deployment:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Content workflow

- Manage branches, team members, home hero images, news, and events in `/studio`.
- Event registration and Google Maps links are optional and only render when supplied.
- Events move between upcoming and past automatically from their end date. Add spotlight media only after the event.

## Deployment

Deploy through the configured production host. Add every required production environment variable there; `.env.local` only affects local development.
