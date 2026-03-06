import { TProduct, TProductCollection } from "@/shopify/types"

import type {
  Product as THydroProduct,
  ImageConnection as TImageConnection,
  ProductVariantConnection as TProductVariant,
} from "@shopify/hydrogen-react/storefront-api-types";

function sanitiseEntries(
  object:
    | TProduct["variants"]
    | TProduct["images"]
    | TProductVariant
    | TImageConnection
    | TProductCollection,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.values(object).flatMap((array) => array?.map((entry) => entry.node));
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
