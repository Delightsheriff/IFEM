import { Env } from "@/interface/env";

/**
 * Values must be read as static member expressions (`process.env.NEXT_PUBLIC_X`)
 * passed as an argument — never as a computed lookup like `process.env[name]`.
 * The bundler can only inline `NEXT_PUBLIC_*` when it sees the literal key, so a
 * computed read survives into the client bundle where `process.env` is `{}` and
 * throws. `app/studio` is a client component, which is where that bites.
 */
function requireEnv(name: string, value: string | undefined): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      `Missing required environment variable "${name}". Add it to .env.local or set it in your deploy provider.`,
    );
  }
  return value;
}

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: requireEnv(
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  ),
  SANITY_DATASET: requireEnv(
    "NEXT_PUBLIC_SANITY_DATASET",
    process.env.NEXT_PUBLIC_SANITY_DATASET,
  ),
};
