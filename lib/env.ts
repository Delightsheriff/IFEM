import { Env } from "@/interface/env";

function readString(name: string): string {
  const value = process.env[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      `Missing required environment variable "${name}". Add it to .env.local or set it in your deploy provider.`,
    );
  }
  return value;
}

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: readString("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  SANITY_DATASET: readString("NEXT_PUBLIC_SANITY_DATASET"),
};
