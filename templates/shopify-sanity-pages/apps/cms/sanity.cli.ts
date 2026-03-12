import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_SANITY_DATASET || "production",
  },
});
