// ./src/components/PostPreview.tsx

import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";

import Post from "./Post";
import { POST_QUERY } from "@/sanity/queries";

export default function PostPreview({
  post,
  params = {},
}: {
  post: SanityDocument;
  params: QueryParams;
}) {
  const [data] = useLiveQuery<SanityDocument>(post, POST_QUERY, params);

  return <Post data={data} />;
}
