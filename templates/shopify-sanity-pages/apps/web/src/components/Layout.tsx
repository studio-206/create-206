import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";

import { revalidatePath } from "@/utils/revalidate-path";

import { SanityImage } from "./CMSImage";
import SEO, { SEOType } from "./SEO";

// TODO: move layout types to external file (re-usability)
type LayoutProps = PropsWithChildren<{
  pageSeo?: SEOType;
  defaultSeo: SEOType;
  favicon?: SanityImage;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}>;

export const Layout: React.FC<LayoutProps> = ({ children, favicon, defaultSeo, pageSeo }) => {
  const router = useRouter();

  useEffect(() => {
    revalidatePath(router.asPath);
  }, []);

  return (
    <>
      <SEO favicon={favicon} defaultSeo={defaultSeo} pageSeo={pageSeo} />
      <main>{children}</main>
    </>
  );
};
