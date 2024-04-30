import Head from "next/head";
import { SanityImage } from "./CMSImage";

export type SEOType = {
  _id: string;
  _type: "seo";
  title?: string;
  description?: string;
  image?: SanityImage;
};

interface SEOProps {
  defaultSeo?: SEOType;
  pageSeo: SEOType;
  favicon?: SanityImage;
}

// SEO type
const SEO = ({ defaultSeo, pageSeo, favicon }: SEOProps) => {
  const title = pageSeo?.title || defaultSeo?.title;
  const description = pageSeo?.description || defaultSeo?.description;
  const image = pageSeo?.image || defaultSeo?.image;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      {favicon ? (
        <link rel="shortcut icon" href={favicon.asset.url} />
      ) : (
        <link rel="icon" href="/favicon.ico" />
      )}
      {image && <meta property="og:image" content={image.asset.url} key="og:image" />}
      <meta property="og:type" content="website" key="og:type" />
    </Head>
  );
};

export default SEO;
