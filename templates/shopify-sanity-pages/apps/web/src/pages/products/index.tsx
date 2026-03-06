// ./src/pages/index.tsx
import { InferGetStaticPropsType } from "next";
import { SanityDocument } from "next-sanity";

import { getClient } from "@/sanity/client";
import { PRODUCTS_PAGE_QUERY, PRODUCTS_QUERY } from "@/sanity/queries";
import { token } from "@/sanity/token";

import { LiveQueryWrapper } from "@/components/sanity/LivePreviewWrapper";
import { ProductsPageTemplate } from "@/components/templates/ProductsPageTempate";

import { getProduct } from "@/shopify/queries";
import {
  TFormattedProduct as TShopifyFormattedProduct,
  TProduct as TShopifyProduct,
} from "@/shopify/types";
import { formatProduct } from "@/shopify/utils/product";
import type { Product as THydroProduct } from "@shopify/hydrogen-react/storefront-api-types";

export default function Games(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const isEnabled = props.draftMode;

  return (
    <LiveQueryWrapper
      isEnabled={isEnabled}
      query={PRODUCTS_PAGE_QUERY}
      initialData={{
        data: props?.data,
      }}
    >
      <ProductsPageTemplate products={props?.products} />
    </LiveQueryWrapper>
  );
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const data = await client.fetch<SanityDocument[]>(PRODUCTS_PAGE_QUERY);
  const sanityProducts = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY);

  if (!data) {
    return {
      notFound: true,
    };
  }

  let products: {
    slug: string;
    product: TShopifyFormattedProduct;
    contextProduct: THydroProduct;
  }[] = [];

  if (sanityProducts.length > 0) {
    products = await Promise.all(
      sanityProducts.map(async (prod) => {
        const { slug } = prod.store;
        const shopifyProduct = (await getProduct(prod.store.slug as string)) as TShopifyProduct;
        const formattedShopifyProduct = formatProduct(shopifyProduct) as TShopifyFormattedProduct;

        return {
          slug,
          product: formattedShopifyProduct,
          contextProduct: shopifyProduct as THydroProduct,
        };
      }),
    );
  }

  return {
    props: {
      slug: "products",
      data,
      products,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
