/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "ifem-sanity",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes as any,
  },
});
