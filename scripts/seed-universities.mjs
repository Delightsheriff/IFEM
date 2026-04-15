/**
 * seed-universities.mjs
 *
 * Uploads each university logo from public/university logos/ to Sanity as an
 * image asset, then creates a ukUniversity document for each one.
 *
 * Usage:
 *   SANITY_API_TOKEN=your_token node scripts/seed-universities.mjs
 *
 * Get a token at: https://sanity.io/manage → your project → API → Tokens
 * The token needs Editor or higher permissions.
 *
 * Safe to re-run — existing documents are skipped (matched by name).
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "../public/university logos");

const client = createClient({
  projectId: "dtwntfir",
  dataset: "production",
  apiVersion: "2024-12-16",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const universities = [
  { name: "University of Derby", logo: "university_of_derby_logo.png", country: "UK" },
  { name: "Heriot-Watt University", logo: "heriot_watt_university.svg", country: "UK" },
  { name: "Fleming College Toronto", logo: "fleming_college_toronto.png", country: "Canada" },
  { name: "University of East London", logo: "university_of_east_london.png", country: "UK" },
  { name: "Thompson Rivers University", logo: "thompson_rivers_university.svg", country: "Canada" },
  { name: "University of Roehampton London", logo: "university_of_roehampton_london.svg", country: "UK" },
  { name: "University of Portsmouth", logo: "university_of_portsmouth.png", country: "UK" },
  { name: "Anglia Ruskin University", logo: "anglia_ruskin_university.png", country: "UK" },
  { name: "Brunel University London", logo: "brunel-university.svg", country: "UK" },
  { name: "Sheffield Hallam University", logo: "sheffield_hallam_university.svg", country: "UK" },
  { name: "Saskatchewan Polytechnic", logo: "saskatchewan_polytechnic.jpg", country: "Canada" },
  { name: "University Canada West", logo: "university_canada_west.png", country: "Canada" },
  { name: "London Metropolitan University", logo: "london_metropolitan_university.svg", country: "UK" },
  { name: "Coventry University", logo: "coventry_university.png", country: "UK" },
  { name: "Lambton College", logo: "lambton_college.webp", country: "Canada" },
  { name: "University of Dundee", logo: "university_of_dundee.png", country: "UK" },
  { name: "Algonquin College", logo: "algonquin_college.jpg", country: "Canada" },
  { name: "Nottingham Trent University", logo: "nottingham_trent_university.svg", country: "UK" },
  { name: "University of Plymouth", logo: "university_of_plymouth.svg", country: "UK" },
  { name: "Teesside University", logo: "teesside_university.png", country: "UK" },
  { name: "Edinburgh Napier University", logo: "edinburgh_napier_university.png", country: "UK" },
  { name: "The University of Law", logo: "the_university_of_law.svg", country: "UK" },
  { name: "Middlesex University London", logo: "middlesex_university_london.png", country: "UK" },
  { name: "Trent University", logo: "trent_university.png", country: "Canada" },
  { name: "University of Liverpool", logo: "university_of_liverpool.svg", country: "UK" },
  { name: "University of Stirling", logo: "university_of_stirling.svg", country: "UK" },
  { name: "De Montfort University Leicester", logo: "de montfort university.jpg", country: "UK" },
  { name: "University of Worcester", logo: "university_of_worcester.svg", country: "UK" },
  { name: "Ulster University", logo: "ulster_university.png", country: "UK" },
  { name: "Birmingham City University", logo: "birmingham_city_university.png", country: "UK" },
  { name: "Buckinghamshire New University", logo: "buckinghamshire_new_university.svg", country: "UK" },
  { name: "Durham College", logo: "durham_college.svg", country: "Canada" },
  { name: "Ravensbourne University London", logo: "ravensbourne_university_london.svg", country: "UK" },
  { name: "Liverpool John Moores University", logo: "liverpool_john_moores_university.gif", country: "UK" },
  { name: "Bangor University", logo: "bangor_university.svg", country: "UK" },
  { name: "University of East Anglia", logo: "university of east anglia.png", country: "UK" },
  { name: "Queen's University Belfast", logo: "queens university belfast.png", country: "UK" },
  { name: "Queen Mary University of London", logo: "queen mary university.png", country: "UK" },
  { name: "University of Bedfordshire", logo: "university_of_bedfordshire.webp", country: "UK" },
  { name: "Kingston University London", logo: "kingston_university_london.svg", country: "UK" },
];

async function getExistingNames() {
  const existing = await client.fetch(
    `*[_type == "ukUniversity"]{ name }`,
  );
  return new Set(existing.map((u) => u.name));
}

async function uploadLogo(filename) {
  const filePath = resolve(PUBLIC_DIR, filename);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ File not found: ${filename} — skipping`);
    return null;
  }
  const ext = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    webp: "image/webp",
    gif: "image/gif",
  };
  const contentType = mimeTypes[ext] ?? "image/png";
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
    contentType,
  });
  return asset._id;
}

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("Error: SANITY_API_TOKEN env variable is required.");
    console.error("  Get one at: https://sanity.io/manage → API → Tokens");
    console.error("  Then run:   SANITY_API_TOKEN=your_token node scripts/seed-universities.mjs");
    process.exit(1);
  }

  console.log(`Seeding ${universities.length} universities to Sanity...`);
  const existing = await getExistingNames();
  console.log(`${existing.size} already exist — will skip those.\n`);

  let created = 0;
  let skipped = 0;

  for (const uni of universities) {
    if (existing.has(uni.name)) {
      console.log(`  skip  ${uni.name}`);
      skipped++;
      continue;
    }

    process.stdout.write(`  upload ${uni.name}... `);
    const assetId = await uploadLogo(uni.logo);
    if (!assetId) { skipped++; continue; }

    await client.create({
      _type: "ukUniversity",
      name: uni.name,
      country: uni.country,
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    });

    console.log("done");
    created++;
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
