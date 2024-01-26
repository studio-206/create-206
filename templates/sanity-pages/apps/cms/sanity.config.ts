import { schemaTypes } from "./schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { isDev } from "sanity";
import { deskStructure } from "./deskStructure";
import { presentationTool } from "sanity/presentation";
import { locate } from "./lib/locate";

const devOnlyPlugins = [visionTool()];

const previewUrl = "http://localhost:3000";

export default defineConfig({
  name: "default",
  title: "Sanity Pages Template",

  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET || "",
  apiVersion: process.env.SANITY_STUDIO_SANITY_API_VERSION || "2022-03-07",

  plugins: [
    structureTool({ structure: deskStructure }),
    ...(isDev ? devOnlyPlugins : []),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: `${previewUrl}/api/draft`,
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
