import React, { PropsWithChildren } from "react";
import { SanityImage } from "./CMSImage";
import SEO, { SEOType } from "./SEO";

type LayoutProps = PropsWithChildren<{
  favicon: SanityImage;
  defaultSeo: SEOType;
  pageSeo: SEOType;
}>;

export const Layout: React.FC<LayoutProps> = ({ children, favicon, defaultSeo, pageSeo }) => {
  return (
    <>
      <SEO favicon={favicon} defaultSeo={defaultSeo} pageSeo={pageSeo} />
      <main>{children}</main>
    </>
  );
};
