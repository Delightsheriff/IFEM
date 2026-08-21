import { Env } from "@/interface/env";

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET!,
};
