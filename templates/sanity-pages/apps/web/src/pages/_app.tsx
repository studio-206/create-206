// ./src/pages/_app.tsx

import "@/styles/globals.css";

import { AppProps } from "next/app";
import { lazy, Suspense } from "react";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import("@/components/sanity/PreviewProvider"));
const VisualEditing = lazy(() => import("@/components/sanity/VisualEditing"));

export default function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

  return draftMode ? (
    <PreviewProvider token={token}>
      <a href="/api/disable-draft" className="fixed bottom-4 right-4 z-50 bg-red-500 p-2 shadow-lg">
        Exit live preview
      </a>
      <Component {...pageProps} />
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <Component {...pageProps} />
  );
}
