import { GetStaticPaths, InferGetStaticPropsType } from "next";

import Post from "@/components/pageComponents/Post";
import { POST_QUERY, POSTS_SLUG_QUERY, SETTINGS_QUERY } from "@/sanity/queries";
import { token } from "@/sanity/token";
import { getClient } from "@/sanity/client";
import { LiveQueryWrapper } from "@/components/sanity/LivePreviewWrapper";
import { SanityDocument } from "next-sanity";

export default function SinglePost(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const isEnabled = props.draftMode;

  return (
    <LiveQueryWrapper
      isEnabled={isEnabled}
      query={POST_QUERY}
      params={props.params}
      initialData={{ data: props.post }}>
      <Post data={props.post} />
    </LiveQueryWrapper>
  );
}

export const getStaticProps = async ({ params = {}, draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);

  const post = await client.fetch(POST_QUERY, params);
  const settings = await client.fetch<SanityDocument[]>(SETTINGS_QUERY);

  return {
    props: {
      post,
      settings,
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
