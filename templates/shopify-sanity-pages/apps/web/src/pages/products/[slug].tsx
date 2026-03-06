import { GetStaticPropsContext } from "next";
import { InferGetStaticPropsType } from "next";
import { groq } from "next-sanity";

import { getClient } from "@/sanity/client";
import { PRODUCT_PATH_QUERY, PRODUCT_QUERY } from "@/sanity/queries";
import { token } from "@/sanity/token";

import { buildBreadcrumbSchema, buildProductSchema } from "@/utils/structured-data";

import { LiveQueryWrapper } from "@/components/sanity/LivePreviewWrapper";
import { ProductTemplate } from "@/components/templates/ProductTemplate";

import { getProduct, getRelatedProducts } from "@/shopify/queries";
import {
  TFormattedProduct as TShopifyFormattedProduct,
  TProduct as TShopifyProduct,
} from "@/shopify/types";
import { formatProduct } from "@/shopify/utils/product";
import { ProductProvider } from "@shopify/hydrogen-react";
import type { Product as THydroProduct } from "@shopify/hydrogen-react/storefront-api-types";

function isNaNumber(value: string) {
  // Check if it's a string that only contains digits (optionally with a decimal point)
  return typeof value === "string" && /^\d+(\.\d+)?$/.test(value);
}

export default function Product(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const isEnabled = props.draftMode;
  const contextProduct = props.data.page?.contextProduct;

  return (
    <ProductProvider data={contextProduct}>
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={PRODUCT_QUERY}
        initialData={{ data: props.data }}
      >
        <ProductTemplate />
      </LiveQueryWrapper>
    </ProductProvider>
  );
}

export async function getStaticProps({ draftMode = false, params }: GetStaticPropsContext) {
  let slug = params && params["slug"];
  const client = getClient(draftMode ? token : undefined);

  // Slug is fetched here to pass down as a prop for enabling previews
  if (slug && isNaNumber(slug as string)) {
    const getSlug = await client.fetch(
      groq`*[_type == "product" && store.id == $slug]{_id, "slug": store.slug.current}`,
      { slug },
    );

    slug = getSlug[0]?.slug;
  }

  const sanityProduct = await client.fetch(PRODUCT_QUERY, { slug });

  if (!sanityProduct?.page) {
    return {
      notFound: true,
    };
  }

  const shopifyProduct = (await getProduct(slug as string)) as TShopifyProduct;

  if (!sanityProduct || !shopifyProduct) return { notFound: true };

  const formattedShopifyProduct = formatProduct(shopifyProduct) as TShopifyFormattedProduct;

  let relatedProducts;

  if (sanityProduct.page && shopifyProduct) {
    if (
      !sanityProduct.page.relatedProducts?.handpickedRelatedProducts ||
      !sanityProduct.page.relatedProducts?.products
    ) {
      const fetchedRelatedProducts = await getRelatedProducts(shopifyProduct.id);
      const formattedRelatedProducts = fetchedRelatedProducts
        .slice(0, 3)
        .map((prod: TShopifyProduct) => formatProduct(prod));
      relatedProducts = formattedRelatedProducts.map((product: TShopifyFormattedProduct) => {
        const variants = product.variants;
        const prices = variants?.map((variant) => parseFloat(variant.price.amount.toString()));
        const compareAtPriceRange = product.compareAtPriceRange;

        prices.sort(function (a: number, b: number) {
          return a - b;
        });

        return {
          img: product.images[0] || null,
          title: product.title || "",
          price: { minVariantPrice: prices[0], maxVariantPrice: prices[prices.length - 1] },
          compareAtPrice: {
            minVariantPrice: compareAtPriceRange?.minVariantPrice.amount,
            maxVariantPrice: compareAtPriceRange?.maxVariantPrice.amount,
          },
          slug: product.handle || "",
          isAvailable: product.availableForSale,
          isOnlyVariant: product.variants.length === 1,
        };
      });
    } else {
      relatedProducts = sanityProduct.page.relatedProducts.products?.map((product) => ({
        img: product?.store?.previewImageUrl || null,
        title: product?.store?.title || "",
        price: product?.store?.priceRange || 0,
        slug: product?.slug || "",
        compareAtPrice: product?.variants ? product?.variants[0]?.compareAtPrice || null : null,
        isAvailable: product?.store?.isDeleted && product?.store?.status !== "draft" ? true : false,
        isOnlyVariant: product?.store?.variants?.length === 1,
      }));
    }
  }

  // Build structured data for product
  const productSchema = buildProductSchema(formattedShopifyProduct);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products/" },
    { name: formattedShopifyProduct.title, url: `/products/${slug}/` },
  ]);

  return {
    props: {
      slug: `products/${slug}`,
      data: {
        page: {
          slug: slug,
          product: formattedShopifyProduct,
          subTitle: sanityProduct.page?.subTitle || null,
          contextProduct: shopifyProduct as THydroProduct,
          additionalInfo: sanityProduct.page?.additionalInfo || null,
          relatedProducts: relatedProducts ? relatedProducts : null,
          handpickedRelatedProducts:
            sanityProduct.page?.relatedProducts?.handpickedRelatedProducts || false,
          seo: {
            title: formattedShopifyProduct?.title,
            description: formattedShopifyProduct?.description || null,
            image: {
              asset: {
                url: formattedShopifyProduct?.images[0]?.url || null,
              },
            },
          },
        },
        settings: sanityProduct.settings,
      },
      structuredData: [productSchema, breadcrumbSchema],
      draftMode,
      token: draftMode ? token : "",
    },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch<string[]>(PRODUCT_PATH_QUERY);

  return {
    paths: paths.map((product) => ({
      params: {
        slug: product,
      },
    })),
    fallback: "blocking",
  };
}
