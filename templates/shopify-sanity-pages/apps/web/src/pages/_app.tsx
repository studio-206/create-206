// ./src/pages/_app.tsx
import { AppProps } from "next/app";
import { lazy, Suspense } from "react";

import { SanityImage } from "@/components/CMSImage";
import { Layout } from "@/components/Layout";
import { SEOType } from "@/components/SEO";

import GeneralProvider from "@/lib/providers/GeneralProvider";
import { ShopProvider } from "@/lib/providers/ShopProvider";
import "@/styles/globals.css";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
  seo: SEOType;
  settings: { favicon: SanityImage; seo: SEOType };
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

interface LayoutProps {
  pageSeo?: SEOType;
  defaultSeo: SEOType;
  favicon?: SanityImage;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const PreviewProvider = lazy(() => import("@/components/sanity/PreviewProvider"));
const VisualEditing = lazy(() => import("@/components/sanity/VisualEditing"));

const MainApp = ({ children, ...rest }: { children: React.ReactNode } & LayoutProps) => {
  return (
    <GeneralProvider>
      <ShopProvider>
        <Layout {...rest}>{children}</Layout>
      </ShopProvider>
    </GeneralProvider>
  );
};

export default function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token, settings, seo, structuredData } = pageProps;

  const defaultSeo = settings?.[0]?.seo;
  const favicon = settings?.[0]?.favicon;

  const layoutProps = {
    defaultSeo,
    pageSeo: seo,
    favicon,
    structuredData,
  };

  return draftMode ? (
    <PreviewProvider token={token}>
      <a href="/api/disable-draft" className="fixed bottom-4 right-4 z-50 bg-red-500 p-2 shadow-lg">
        Exit live preview
      </a>
      <MainApp {...layoutProps}>
        <Component {...pageProps} />
      </MainApp>
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <MainApp {...layoutProps}>
      <Component {...pageProps} />
    </MainApp>
  );
}
