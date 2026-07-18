import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";

const apply = process.argv.includes("--apply");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLScK8A14lxP-AA0Pr79OAyZgQPyGcff4UzPFtLyath7SJVT2WQ/viewform?usp=publish-editor";
const testEventIds = [
  "event-test-interactive-conference-lagos",
  "event-test-document-review-enugu",
  "event-test-conference-spotlight",
];
const flyers = {
  multiCity: "/Users/MAC/Downloads/WhatsApp Image 2026-07-18 at 10.55.21.jpeg",
  awkaOwerriPortHarcourt: "/Users/MAC/Downloads/WhatsApp Image 2026-07-18 at 10.55.21 (1).jpeg",
  awkaFaq: "/Users/MAC/Downloads/WhatsApp Image 2026-07-18 at 10.55.22.jpeg",
};

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.");
  process.exit(1);
}

for (const [name, filePath] of Object.entries(flyers)) {
  if (!existsSync(filePath)) {
    console.error(`Missing ${name} flyer: ${filePath}`);
    process.exit(1);
  }
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-12-16", useCdn: false });

const block = (key, text) => ({
  _key: key,
  _type: "block",
  children: [{ _key: `${key}-span`, _type: "span", text }],
  markDefs: [],
  style: "normal",
});

const sharedHighlights = [
  "Detailed information on the UK study process",
  "Admission and visa advice",
  "One-to-one conversations with UK university representatives",
  "On-the-spot admission guidance",
  "Free gifts, scholarships and more",
];

const expoContent = (key) => [
  block(`${key}-intro`, "Study in the UK Expo 2026 is a free IFEM Education programme for students and families planning their UK study journey."),
  block(`${key}-guidance`, "Meet the IFEM team and UK university representatives for practical guidance on admissions, visas, courses and your next steps."),
  block(`${key}-community`, "Come with friends and loved ones, ask every question on your mind, and take the next step towards your UK study plans together."),
];

const eventDefinitions = [
  {
    _id: "event-ifem-uk-expo-abuja-2026",
    title: "IFEM Study in the UK Expo 2026 — Abuja",
    slug: "ifem-study-in-the-uk-expo-2026-abuja",
    excerpt: "A free UK study expo in Abuja with admissions and visa guidance, university representatives and practical next-step support.",
    startsAt: "2026-07-11T11:00:00+01:00",
    endsAt: "2026-07-11T16:00:00+01:00",
    location: "Rochview Hotel Royale, Abuja",
    flyer: "multiCity",
    alt: "IFEM Study in the UK Expo 2026 flyer listing Abuja and other Nigerian cities",
  },
  {
    _id: "event-ifem-uk-expo-awka-2026",
    title: "IFEM Study in the UK Expo 2026 — Awka",
    slug: "ifem-study-in-the-uk-expo-2026-awka",
    excerpt: "A free UK study expo in Awka with admissions and visa guidance, university representatives and practical next-step support.",
    startsAt: "2026-07-18T11:00:00+01:00",
    endsAt: "2026-07-18T16:00:00+01:00",
    location: "Hilton Leisure Hotel, No. 41 Regina Caeli Road, off Enugu-Onitsha Expressway, Awka, Anambra State",
    flyer: "awkaFaq",
    alt: "IFEM Study in the UK Expo 2026 Awka FAQ flyer",
  },
  {
    _id: "event-ifem-uk-expo-owerri-2026",
    title: "IFEM Study in the UK Expo 2026 — Owerri",
    slug: "ifem-study-in-the-uk-expo-2026-owerri",
    excerpt: "A free UK study expo in Owerri with admissions and visa guidance, university representatives and practical next-step support.",
    startsAt: "2026-07-23T11:00:00+01:00",
    endsAt: "2026-07-23T16:00:00+01:00",
    location: "Bon Hotel Tripod, Owerri",
    flyer: "awkaOwerriPortHarcourt",
    alt: "IFEM Study in the UK Expo 2026 flyer listing Awka, Owerri and Port Harcourt",
  },
  {
    _id: "event-ifem-uk-expo-port-harcourt-2026",
    title: "IFEM Study in the UK Expo 2026 — Port Harcourt",
    slug: "ifem-study-in-the-uk-expo-2026-port-harcourt",
    excerpt: "A free UK study expo in Port Harcourt with admissions and visa guidance, university representatives and practical next-step support.",
    startsAt: "2026-07-25T11:00:00+01:00",
    endsAt: "2026-07-25T16:00:00+01:00",
    location: "Galaxy La-Palm Hotels and Resorts, Port Harcourt",
    flyer: "multiCity",
    alt: "IFEM Study in the UK Expo 2026 flyer listing Abuja, Awka, Owerri and Port Harcourt",
  },
];

async function uploadFlyers() {
  const uploaded = {};
  for (const [name, filePath] of Object.entries(flyers)) {
    process.stdout.write(`Uploading ${name} flyer... `);
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename: `ifem-study-in-the-uk-expo-2026-${name}.jpeg`,
      contentType: "image/jpeg",
    });
    uploaded[name] = asset._id;
    console.log("done");
  }
  return uploaded;
}

console.log(`${apply ? "Applying" : "Dry run:"} remove ${testEventIds.length} test event(s) and create/update ${eventDefinitions.length} July Expo event(s).`);
for (const event of eventDefinitions) console.log(`UPSERT event/${event._id}: ${event.title}`);

if (!apply) {
  console.log("Review the targets, then rerun with --apply to upload the flyers and make these exact changes.");
  process.exit(0);
}

const uploadedFlyers = await uploadFlyers();
const transaction = testEventIds.reduce((tx, id) => tx.delete(id), client.transaction());
for (const event of eventDefinitions) {
  transaction.createOrReplace({
    _id: event._id,
    _type: "event",
    title: event.title,
    slug: { _type: "slug", current: event.slug },
    excerpt: event.excerpt,
    format: "university-fair",
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    attendanceMode: "in-person",
    location: event.location,
    attendance: "free-registration",
    availability: "Free entry",
    highlights: sharedHighlights,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: uploadedFlyers[event.flyer] }, alt: event.alt },
    registrationUrl,
    registrationLabel: "Register for free",
    content: expoContent(event.slug),
  });
}

const result = await transaction.commit();
console.log(`Committed ${result.results.length} mutation(s).`);
