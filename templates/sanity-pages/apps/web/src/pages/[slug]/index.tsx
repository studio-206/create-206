import { QueryParams, SanityDocument } from "next-sanity";
import { GetStaticPaths } from "next";

import Post from "@/components/Post";
import PostPreview from "@/components/PostPreview";
import { POST_QUERY, POSTS_SLUG_QUERY } from "@/sanity/queries";
import { token } from "@/sanity/token";
import { getClient } from "@/sanity/client";

type PageProps = {
  post: SanityDocument;
  params: QueryParams;
  draftMode: boolean;
  token: string;
};

export default function SinglePost(props: PageProps) {
  return props.draftMode ? (
    <PostPreview post={props.post} params={props.params} />
  ) : (
    <Post data={props.post} />
  );
}

export const getStaticProps = async ({ params = {}, draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const post = await client.fetch<SanityDocument>(POST_QUERY, params);

  return {
    props: {
      post,
      params,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(POSTS_SLUG_QUERY);

  return { paths, fallback: true };
};
