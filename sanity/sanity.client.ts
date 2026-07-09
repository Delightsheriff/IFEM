import { EnvVariables } from "@/lib/env";
import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  apiVersion: "2024-12-16",
  useCdn: false,
  ...(EnvVariables.SANITY_API_TOKEN ? { token: EnvVariables.SANITY_API_TOKEN } : {}),
};

const client = createClient(config);

export default client;
