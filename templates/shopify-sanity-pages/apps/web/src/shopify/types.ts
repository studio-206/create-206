export type TProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: Image;
  images: TImageConnection;
  options: ProductOption[];
  collections: TProductCollection;
  variants: TProductVariantConnection;
  priceRange: TProductPriceRange;
  compareAtPriceRange: TProductPriceRange;
  seo: SEO;
  metafields: Metafield[];
};

export type TFormattedProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: Image;
  images: Image[];
  options: ProductOption[];
  collections: {
    id: string;
    title: string;
  }[];
  variants: ProductVariant[];
  priceRange: TProductPriceRange;
  compareAtPriceRange: TProductPriceRange;
  seo: SEO;
  metafields: Metafield[];
};

/* ==============================
    🔹 Product Subtypes
============================== */

export type Image = {
  id?: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type TImageConnection = {
  edges: { node: Image }[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  sku?: string;
  weight?: number;
  weightUnit?: string;
  selectedOptions: SelectedOption[];
  image?: Image;
};

export type TProductVariantConnection = {
  edges: { node: ProductVariant }[];
};

export type TProductCollection = {
  edges: {
    node: {
      id: string;
      title: string;
    };
  }[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type TProductPriceRange = {
  minVariantPrice: MoneyV2;
  maxVariantPrice: MoneyV2;
};

export type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type SEO = {
  title?: string;
  description?: string;
};

export type Metafield = {
  id: string;
  key: string;
  namespace: string;
  value: string;
  type: string;
  description?: string;
};
