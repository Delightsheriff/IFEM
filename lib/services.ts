/**
 * Single source of truth for the eight services IFEM offers.
 *
 * The home page renders these grouped under "Counselling & Preparation"
 * and "Processing & Support" in a dark-themed checklist; the about page
 * renders the same eight in a forest panel with a flat checklist. Both
 * pages style independently — they only share *what* the services are.
 */

export interface ServiceItem {
  name: string;
  desc: string;
}

export interface ServiceGroup {
  number: string;
  title: string;
  items: ServiceItem[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    number: "01",
    title: "Counselling & Preparation",
    items: [
      { name: "Career Counselling",          desc: "Matching your goals to the right programmes and institutions" },
      { name: "Admission Processing",  desc: "Full management of your university applications and offers" },
      { name: "Visa Advice",            desc: "Expert guidance on UK student visa requirements and documents" },
      { name: "Interview Preparation",       desc: "Coaching and mock sessions for visa and university interviews" },
    ],
  },
  {
    number: "02",
    title: "Processing & Support",
    items: [
      { name: "Medical Appointment Scheduling", desc: "Scheduling at appointed UKVI approved test centers" },
      { name: "Biometric Submissions Booking", desc: "Appointment booking at certified UK visa application centres" },
      { name: "Pre-Departure Support",        desc: "Travel arrangements planned ahead of your departure" },
      { name: "Funding Solutions",     desc: "Guidance on scholarships, bursaries, and funding pathways" },
    ],
  },
];
