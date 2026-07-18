import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const LEGACY_GUIDE_IDS = [
  "fd448d8c-b05e-4cb4-bc51-792fbea4cf47",
  "9ae8a166-13ca-47e9-9f21-d14e13ed5061",
];
const COVER_IMAGE_REF = "image-5e04a90f7b53510dca94a60dca9eb0c0556a778f-1536x2048-jpg";

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-12-16", useCdn: false });
const block = (key, text) => ({ _key: key, _type: "block", children: [{ _key: `${key}-span`, _type: "span", text }], markDefs: [], style: "normal" });
const coverImage = (alt) => ({ _type: "image", asset: { _type: "reference", _ref: COVER_IMAGE_REF }, alt });

const documents = [
  {
    _id: "newsArticle-ifem-brand-ambassador",
    _type: "newsArticle",
    title: "IFEM Education welcomes May Edochie as brand ambassador",
    slug: { _type: "slug", current: "ifem-education-welcomes-may-edochie" },
    excerpt: "IFEM Education is proud to partner with May Edochie to encourage more students to pursue international study with confidence.",
    category: "ifem-news",
    readTime: 2,
    featured: true,
    content: [
      block("ambassador-1", "IFEM Education has welcomed May Edochie as its brand ambassador. The partnership reflects a shared belief that quality education can open meaningful opportunities for students and families."),
      block("ambassador-2", "We look forward to helping more aspiring students take informed steps towards their study-abroad goals."),
    ],
  },
  {
    _id: "newsArticle-ifem-study-conferences",
    _type: "newsArticle",
    title: "What to expect at an IFEM study interactive conference",
    slug: { _type: "slug", current: "what-to-expect-at-an-ifem-study-interactive-conference" },
    excerpt: "IFEM study conferences bring prospective students, counsellors and partner-university representatives together for practical UK study guidance.",
    category: "preparation",
    readTime: 2,
    content: [
      block("conference-1", "Come prepared to ask questions about courses, admissions and visas. Our interactive sessions are designed to help you understand the next steps in your UK study journey."),
      block("conference-2", "When document review is available, bring clear copies of your academic documents so the conversation can be more useful."),
    ],
  },
  {
    _id: "event-test-interactive-conference-lagos",
    _type: "event",
    title: "Test: IFEM UK Study Interactive Conference — Lagos",
    slug: { _type: "slug", current: "test-ifem-uk-study-interactive-conference-lagos" },
    excerpt: "Test event based on IFEM's interactive conference format, with practical admissions guidance, questions and document-review preparation.",
    format: "interactive-conference",
    startsAt: "2026-07-16T09:00:00+01:00",
    endsAt: "2026-07-20T16:00:00+01:00",
    attendanceMode: "in-person",
    location: "Adedayo House, Cement Bus Stop, Lagos",
    attendance: "free-registration",
    availability: "Test event — free registration",
    host: { name: "Dr. Millicent Ohanagorom", role: "IFEM Education founder" },
    highlights: ["Ask direct questions about UK study options", "Prepare documents for an initial review", "Meet the IFEM counselling team"],
    whatToBring: ["Academic documents or clear copies", "A list of your preferred courses", "Questions about your study plans"],
    coverImage: coverImage("IFEM Education test event cover image"),
    content: [block("lagos-event-1", "This is a test event entry created to verify the ongoing-event view. Replace its dates, location and details with the confirmed live event information before public promotion.")],
  },
  {
    _id: "event-test-document-review-enugu",
    _type: "event",
    title: "Test: UK Application & Document Review Clinic — Enugu",
    slug: { _type: "slug", current: "test-uk-application-document-review-clinic-enugu" },
    excerpt: "Test event for students who want a structured conversation about courses, application documents and their UK study timeline.",
    format: "document-review-clinic",
    startsAt: "2026-07-18T10:00:00+01:00",
    endsAt: "2026-07-19T15:00:00+01:00",
    attendanceMode: "in-person",
    location: "IFEM Education, Enugu",
    attendance: "free-registration",
    availability: "Test event — limited review slots",
    highlights: ["Review your application preparation", "Understand document requirements", "Discuss a realistic next-step plan"],
    whatToBring: ["Academic transcripts and certificates", "A valid form of identification", "Your questions for a counsellor"],
    coverImage: coverImage("IFEM Education test document review event cover image"),
    content: [block("enugu-event-1", "This is a test event entry created to verify a concurrent upcoming event. Replace it with confirmed IFEM event information before public promotion.")],
  },
  {
    _id: "event-test-conference-spotlight",
    _type: "event",
    title: "Test: IFEM Study Interactive Conference Highlights",
    slug: { _type: "slug", current: "test-ifem-study-interactive-conference-highlights" },
    excerpt: "Test completed event used to verify the past-event spotlight and gallery experience.",
    format: "interactive-conference",
    startsAt: "2026-06-20T10:00:00+01:00",
    endsAt: "2026-06-20T15:00:00+01:00",
    attendanceMode: "in-person",
    location: "IFEM Education, Lagos",
    attendance: "free-registration",
    coverImage: coverImage("IFEM Education test event spotlight cover image"),
    content: [block("spotlight-event-1", "This is a test completed event. Its spotlight confirms that only fully described media is displayed in the past-event gallery.")],
    spotlight: {
      heading: "Test event spotlight",
      summary: "A test gallery entry for checking the completed-event experience before real event photography and video are added.",
      media: [coverImage("IFEM Education test spotlight image")],
    },
  },
];

const guides = await client.fetch(`*[_type == "guides"]{_id,title}`);
const guideIds = guides.map((guide) => guide._id).sort();
if (JSON.stringify(guideIds) !== JSON.stringify([...LEGACY_GUIDE_IDS].sort())) {
  console.error("Legacy Guides no longer match the two confirmed documents. Aborting without changes.");
  console.error(JSON.stringify(guides));
  process.exit(1);
}

console.log(`${apply ? "Applying" : "Dry run:"} delete ${guides.length} legacy guide(s) and create/update ${documents.length} News & Events document(s).`);
for (const guide of guides) console.log(`DELETE guides/${guide._id}: ${guide.title}`);
for (const document of documents) console.log(`UPSERT ${document._type}/${document._id}: ${document.title}`);

if (!apply) {
  console.log("Review the targets, then rerun with --apply to make these exact changes.");
  process.exit(0);
}

const transaction = guides.reduce((tx, guide) => tx.delete(guide._id), client.transaction());
const result = await documents.reduce((tx, document) => tx.createOrReplace(document), transaction).commit();
console.log(`Committed ${result.results.length} mutation(s).`);
