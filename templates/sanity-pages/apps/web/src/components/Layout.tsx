import React, { useEffect, PropsWithChildren } from "react";
import { SanityImage } from "./CMSImage";
import SEO, { SEOType } from "./SEO";
import { useRouter } from "next/router";
import { revalidatePath } from "@/utils/revalidate-path";

type LayoutProps = PropsWithChildren<{
  favicon: SanityImage;
  defaultSeo: SEOType;
  pageSeo: SEOType;
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
