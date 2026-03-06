import { ReactNode } from "react";

import { useGeneralProvider } from "./GeneralProvider";

import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";

export function ShopProvider({ children }: { children: ReactNode }) {
  const { setOpenCart } = useGeneralProvider();

  return (
    <ShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_API_URL || ""}
      storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_TOKEN || ""}
      storefrontApiVersion="2024-10"
      countryIsoCode="GB"
      languageIsoCode="EN"
    >
      <CartProvider countryCode="GB" languageCode="EN" onLineAddComplete={() => setOpenCart(true)}>
        {children}
      </CartProvider>
    </ShopifyProvider>
  );
}
