/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";
import { codeInput } from "@sanity/code-input";
import { BarChart3, FileText } from "lucide-react";

/**
 * Types that should exist as a single document (settings-style).
 * Adding them here:
 *  - pins a single editable item under the listed labels in the studio,
 *  - hides them from the default document-type list (so editors don't
 *    accidentally create siblings),
 *  - guarantees the document id is stable, which keeps the GROQ
 *    queries (`*[_type == "siteStats"][0]`) deterministic.
 */
const SINGLETONS: Array<{ id: string; type: string; title: string; icon: any }> = [
  { id: "siteStats", type: "siteStats", title: "Site Statistics", icon: BarChart3 },
  { id: "about", type: "about", title: "About Page", icon: FileText },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export default defineConfig({
  name: "default",
  title: "ifem-sanity",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title("Content")
          .items([
            ...SINGLETONS.map(({ id, type, title, icon }) =>
              S.listItem()
                .title(title)
                .icon(icon)
                .child(
                  S.editor()
                    .id(id)
                    .schemaType(type)
                    .documentId(id),
                ),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item: any) => !SINGLETON_TYPES.has(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],

  // Block create / delete on singletons so editors can't fork them.
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(
            (a) =>
              a.action !== "duplicate" &&
              a.action !== "delete" &&
              a.action !== "unpublish",
          )
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((t) => !SINGLETON_TYPES.has(t.templateId))
        : prev,
  },

  schema: {
    types: schemaTypes as any,
  },
});
