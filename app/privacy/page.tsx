import type { Metadata } from "next";

// Privacy policy changes rarely — daily revalidation is plenty.
export const revalidate = 86400;

import PageContentWrapper from "@/components/ui/page-content-wrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How IFEM Education collects, uses, and protects your personal information when you use our UK university admission and visa advisory services.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "1 April 2025";
const CONTACT_EMAIL = "contact@ifemeducation.com";
const SITE_NAME = "IFEM Education";

const sections = [
  {
    id: "information-we-collect",
    heading: "1. Information We Collect",
    body: [
      "When you submit an enquiry, fill in our contact form, or book a consultation, we collect personal information including your name, email address, phone number, academic background, and intended course of study.",
      "We also collect information automatically when you visit our website — such as your IP address, browser type, pages visited, and time spent on each page — through standard web analytics tools.",
      "We do not collect sensitive personal data such as financial account details or government identification numbers unless you voluntarily provide them in the context of an application and explicitly consent to their processing.",
    ],
  },
  {
    id: "how-we-use-your-information",
    heading: "2. How We Use Your Information",
    body: [
      "We use your information to respond to your enquiries, assess your eligibility for UK university programmes, connect you with suitable partner institutions, and guide you through the admission and visa application process.",
      "With your consent, we may send you updates about new partner universities, UK student visa regulations, scholarship opportunities, and relevant resources. You can withdraw this consent at any time by contacting us.",
      "We use anonymised, aggregated analytics data to improve our website content and the services we offer. This data cannot be used to identify you individually.",
    ],
  },
  {
    id: "sharing-your-information",
    heading: "3. Sharing Your Information",
    body: [
      "We share your personal information with UK partner universities and colleges only when you have expressed interest in applying to a specific institution and have given us permission to submit your details on your behalf.",
      "We do not sell, rent, or trade your personal information to third parties. We may share data with trusted service providers (e.g. email delivery, document processing) who act as data processors under our instruction and are bound by confidentiality obligations.",
      "We may disclose your information if required to do so by law or in response to a valid request from a regulatory authority.",
    ],
  },
  {
    id: "data-retention",
    heading: "4. Data Retention",
    body: [
      "We retain your personal information for as long as necessary to provide our services and fulfil the purposes described in this policy, or as required by applicable law.",
      "If you have not engaged with us for more than three years and have not requested otherwise, we will securely delete or anonymise your personal data.",
      "You may request deletion of your data at any time by contacting us at the address below. We will process your request within 30 days.",
    ],
  },
  {
    id: "cookies",
    heading: "5. Cookies",
    body: [
      "Our website uses cookies to understand how visitors interact with our content and to measure the effectiveness of our pages. We use analytics cookies (such as those provided by Vercel Analytics) which collect anonymised data only.",
      "We do not use advertising or tracking cookies. You can control cookie behaviour through your browser settings. Disabling cookies may affect the functionality of some features of our website.",
    ],
  },
  {
    id: "your-rights",
    heading: "6. Your Rights",
    body: [
      "You have the right to access the personal data we hold about you, request corrections to inaccurate information, request deletion of your data, and object to certain types of processing.",
      "If you are in the European Economic Area or the United Kingdom, you have additional rights under the GDPR and UK GDPR respectively, including the right to data portability and the right to lodge a complaint with a supervisory authority.",
      `To exercise any of these rights, please contact us at ${CONTACT_EMAIL}. We will respond within 30 days of receiving your request.`,
    ],
  },
  {
    id: "security",
    heading: "7. Security",
    body: [
      "We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. Our website is served over HTTPS and we restrict access to personal data to staff who need it to perform their duties.",
      "No method of electronic transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.",
    ],
  },
  {
    id: "third-party-links",
    heading: "8. Third-Party Links",
    body: [
      "Our website may contain links to partner university websites and other third-party resources. This privacy policy applies only to our website. We are not responsible for the privacy practices of external sites and encourage you to read their privacy policies independently.",
    ],
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    body: [
      `We may update this Privacy Policy from time to time to reflect changes in our services or applicable law. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.`,
    ],
  },
  {
    id: "contact",
    heading: "10. Contact Us",
    body: [
      `If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at ${CONTACT_EMAIL} or visit our contact page.`,
    ],
  },
];

export default function Privacy() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-cream border-b border-sage/20">
        <PageContentWrapper>
          <div className="max-w-2xl pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Legal
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray text-sm">
              Last updated: <span className="font-semibold text-charcoal">{LAST_UPDATED}</span>
            </p>
          </div>
        </PageContentWrapper>
      </div>

      {/* Body */}
      <PageContentWrapper>
        <div className="py-12 md:py-16 grid md:grid-cols-[220px_1fr] gap-12 max-w-5xl">
          {/* Sticky sidebar nav */}
          <aside className="hidden md:block">
            <nav className="sticky top-24">
              <p className="text-[10px] uppercase tracking-widest text-gray/60 font-semibold mb-4">
                Contents
              </p>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-xs text-gray hover:text-forest transition-colors block py-1 border-l-2 border-transparent hover:border-forest pl-3"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="space-y-12">
            <p className="text-gray leading-relaxed">
              {SITE_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
              personal information. This Privacy Policy explains what data we collect, why we collect
              it, how we use it, and your rights regarding your information. By using our website or
              services, you agree to the practices described here.
            </p>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4 pb-3 border-b border-sage/20">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-gray leading-relaxed text-[15px]">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="pt-4 border-t border-sage/20">
              <p className="text-xs text-gray/60">
                Questions? Visit our{" "}
                <Link href="/contact" className="text-forest hover:underline">
                  contact page
                </Link>{" "}
                or email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </PageContentWrapper>
    </div>
  );
}
