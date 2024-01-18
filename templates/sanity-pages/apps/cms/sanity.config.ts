import { schemaTypes } from "./schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { isDev } from "sanity";
import { deskStructure } from "./deskStructure";

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  name: "default",
  title: "Sanity Pages Template",

  projectId: "cqtgqlz7",
  dataset: "production",

  plugins: [structureTool({ structure: deskStructure }), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
});
