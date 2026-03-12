// ./src/pages/index.tsx
import { InferGetStaticPropsType } from "next";
import { SanityDocument } from "next-sanity";

import { getClient } from "@/sanity/client";
import { POSTS_QUERY, SETTINGS_QUERY } from "@/sanity/queries";
import { token } from "@/sanity/token";

import { buildOrganizationSchema, buildWebSiteSchema } from "@/utils/structured-data";

import Posts from "@/components/pageComponents/Posts";
import { LiveQueryWrapper } from "@/components/sanity/LivePreviewWrapper";

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

  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return {
    props: {
      posts,
      settings,
      structuredData: [organizationSchema, webSiteSchema],
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
