/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FAQ {
  _id: string;
  question: string;
  answer: any[]; // Rich text blocks from Sanity
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
  content: any[]; // Rich text blocks from Sanity
  _createdAt: string;
}
