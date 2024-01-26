import { token } from "@/sanity/token";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-03-07",
  useCdn: false,
  token,
});

export default async function handle(req: NextApiRequest, res: NextApiResponse<string | void>) {
  if (!req.url) {
    throw new Error("Missing url");
  }
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(client, req.url);
  if (!isValid) {
    return res.status(401).send("Invalid secret");
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
