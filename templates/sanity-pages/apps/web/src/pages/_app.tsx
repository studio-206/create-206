import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";

export type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available. Else fall back to the default `<Layout />`.
  // Basically we can override the default layout if we want to.

  return <Component {...pageProps} />;
}
