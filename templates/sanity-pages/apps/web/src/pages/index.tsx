// ./src/pages/index.tsx

import { SanityDocument } from "next-sanity";

import { getClient } from "@/sanity/client";
import { token } from "@/sanity/token";
import { POSTS_QUERY, SETTINGS_QUERY } from "@/sanity/queries";

import { InferGetStaticPropsType } from "next";
import { LiveQueryWrapper } from "@/components/sanity/LivePreviewWrapper";
import Posts from "@/components/pageComponents/Posts";

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const isEnabled = props.draftMode;

  return (
    <LiveQueryWrapper isEnabled={isEnabled} query={POSTS_QUERY} initialData={{ data: props.posts }}>
      <Posts data={props.posts} />
    </LiveQueryWrapper>
  );
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  const settings = await client.fetch<SanityDocument[]>(SETTINGS_QUERY);

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
