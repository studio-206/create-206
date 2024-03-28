// ./src/pages/_app.tsx

import { SanityImage } from "@/components/CMSImage";
import { Layout } from "@/components/Layout";
import { SEOType } from "@/components/SEO";
import "@/styles/globals.css";

import { AppProps } from "next/app";
import { lazy, Suspense } from "react";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
  seo: SEOType;
  settings: { favicon: SanityImage; seo: SEOType };
}

const PreviewProvider = lazy(() => import("@/components/sanity/PreviewProvider"));
const VisualEditing = lazy(() => import("@/components/sanity/VisualEditing"));

export default function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token, settings, seo } = pageProps;

  const defaultSeo = settings?.[0]?.seo;
  const favicon = settings?.[0]?.favicon;

  return draftMode ? (
    <PreviewProvider token={token}>
      <a href="/api/disable-draft" className="fixed bottom-4 right-4 z-50 bg-red-500 p-2 shadow-lg">
        Exit live preview
      </a>
      <Layout favicon={favicon} defaultSeo={defaultSeo} pageSeo={seo}>
        <Component {...pageProps} />
      </Layout>
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <Layout favicon={favicon} defaultSeo={defaultSeo} pageSeo={seo}>
      <Component {...pageProps} />
    </Layout>
  );
}
