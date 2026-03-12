import { TProduct } from "@/shopify/types";

import type { Product as THydroProduct } from "@shopify/hydrogen-react/storefront-api-types";

function sanitiseEntries<T>(connection: { edges: { node: T }[] }): T[] {
  return connection.edges.map((edge) => edge.node);
}

export function formatProduct(product: TProduct | THydroProduct) {
  const { variants, images, collections } = product;
  return {
    ...product,
    variants: sanitiseEntries(variants),
    images: sanitiseEntries(images),
    collections: sanitiseEntries(collections),
  };
}
