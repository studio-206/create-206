// ./src/pages/index.tsx

import { SanityDocument } from "next-sanity";

import { getClient } from "@/sanity/client";
import { token } from "@/sanity/token";
import { POSTS_QUERY } from "@/sanity/queries";
import Posts from "@/components/Posts";
import PostsPreview from "@/components/PostsPreview";

type PageProps = {
  posts: SanityDocument[];
  draftMode: boolean;
  token: string;
};

export default function Home(props: PageProps) {
  return props.draftMode ? <PostsPreview posts={props.posts} /> : <Posts posts={props.posts} />;
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  return {
    props: {
      posts,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
