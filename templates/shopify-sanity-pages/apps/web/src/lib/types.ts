import { SanityDocument } from "next-sanity";
import type { Product as THydroProduct } from "@shopify/hydrogen-react/storefront-api-types";
import { TFormattedProduct } from "@/shopify/types";

export type TPage = {
  data?: {
    page?: SanityDocument;
  };
};

export type TProductsPage = {
  data?: {
    page?: SanityDocument;
  };
  products: {
    slug: string;
    product: TFormattedProduct;
    contextProduct: THydroProduct;
  }[];
};
