# IFEM Education

IFEM Education’s public website and Sanity Studio.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`; manage content at `/studio`.

## Before deploying

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Set the required Sanity, Resend, Turnstile, and contact-rotation variables in the deployment environment. Never commit `.env.local`.
