import type { PortableTextBlock } from "@portabletext/types";

export interface SiteStats {
  studentsPlaced: number;
  partnerUniversities: number;
  yearsInService: number;
  visaSuccessRate: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category: string;
  featured: boolean;
}

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

export interface SuccessStory {
  _id: string;
  studentName: string;
  schoolDestination: string;
  comment: string;
  featured: boolean;
  studentImage?: {
    asset?: {
      _ref: string;
      url?: string;
    };
    url?: string;
    alt?: string;
  };
}

export interface Guide {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  readTime: number; // in minutes
  category: string;
  content: PortableTextBlock[];
  _createdAt: string;
  _updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: { url?: string; alt?: string };
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  email: string;
  phone?: string;
  image: string;
  bio?: string;
  department?: "Leadership" | "Admissions" | "Support" | "Visa";
  socialLinks?: SocialLink[];
}

export interface BranchPhone {
  label: string;  // e.g. "WhatsApp", "Main Line"
  number: string;
}

export type Branch = {
  _id: string;
  name: string;
  slug?: { current: string };
  type: "hq" | "branch";
  address: string;
  city: string;
  country: string;
  /** Legacy single phone — prefer phones[] for new data */
  phone?: string;
  /** Multiple phones with labels */
  phones?: BranchPhone[];
  email: string;
  mapEmbed?: string;
  hours?: string;
  directionsUrl?: string;
};

/** Minimal shape used to hydrate the header/footer with live contact info */
export interface HQContact {
  email: string;
  phones: BranchPhone[];
  /** Fallback if phones array is empty */
  phone?: string;
}

export interface About {
  _id: string;
  establishedYear: number;
  headline: string;
  tagline: string;
  heroImage?: {
    asset?: {
      _ref: string;
      url?: string;
    };
    url?: string;
    alt?: string;
  };
  stats?: {
    numberOfStudentsPlaced: number;
    numberOfPartnerUkUniversities: number;
    yearsOfExperience: number;
    successRate: number;
  };
  missions?: Array<{
    title: string;
    description: string;
    icon?:
      | "compass"
      | "target"
      | "heart-handshake"
      | "lightbulb"
      | "shield-check"
      | "sparkles";
  }>;
  founder?: {
    name: string;
    title: string;
    bio?: PortableTextBlock[];
    quote?: string;
    image?: {
      asset?: {
        _ref: string;
        url?: string;
      };
      url?: string;
      alt?: string;
    };
  };
  values?: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export type UKUniversity = {
  _id: string;
  name: string;
  logo: string | null;
};
