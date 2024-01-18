import type { SanityClient } from "next-sanity";
import { createClient } from "@sanity/client/stega";

export function getClient(previewToken?: string): SanityClient {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION || "2022-03-07",
    useCdn: !previewToken,
    perspective: previewToken ? "previewDrafts" : "published",
    stega: {
      enabled: previewToken ? true : false,
      studioUrl: "/studio",
    },
    token: previewToken,
  });
}
