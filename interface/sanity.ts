export interface FAQ {
  _id: string;
  question: string;
  answer: any[]; // Rich text blocks from Sanity
  category: string;
  featured: boolean;
}
