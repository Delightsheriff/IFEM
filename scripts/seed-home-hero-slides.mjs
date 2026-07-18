import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { resolve } from "node:path";

const apply = process.argv.includes("--apply");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const slides = [
  {
    file: resolve("public/hero-student.jpg"),
    alt: "IFEM student celebrating a UK university admission",
  },
  {
    file: resolve("public/section-students.jpg"),
    alt: "Students supported by IFEM Education",
  },
  {
    file: resolve("public/section-graduate.jpg"),
    alt: "Graduate celebrating an international education journey",
  },
];

if (!projectId || !dataset || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.",
  );
  process.exit(1);
}

for (const slide of slides) {
  if (!existsSync(slide.file)) {
    console.error(`Missing hero image: ${slide.file}`);
    process.exit(1);
  }
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-12-16",
  useCdn: false,
});

console.log(
  `${apply ? "Applying" : "Dry run:"} seed ${slides.length} home hero images to Sanity.`,
);
if (!apply) {
  console.log(
    "Review the targets, then rerun with --apply to upload the images and update the Home Page document.",
  );
  process.exit(0);
}

const uploadedSlides = [];
for (const slide of slides) {
  process.stdout.write(`Uploading ${slide.file.split("/").pop()}... `);
  const asset = await client.assets.upload(
    "image",
    createReadStream(slide.file),
    {
      filename: `ifem-home-hero-${slide.file.split("/").pop()}`,
      contentType: "image/jpeg",
    },
  );
  uploadedSlides.push({
    _key: asset._id.replace("image-", ""),
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: slide.alt,
  });
  console.log("done");
}

await client.createOrReplace({
  _id: "homePage",
  _type: "homePage",
  heroSlides: uploadedSlides,
});
console.log("Updated homePage hero slides.");
