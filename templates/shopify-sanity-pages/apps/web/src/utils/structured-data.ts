/**
 * Schema.org structured data builder utilities
 * These functions generate JSON-LD markup for various schema types
 */

const SITE_URL = process.env.NEXT_PUBLIC_CANONICAL;
const SITE_NAME = "SITE NAME HERE";

interface SchemaBase {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Organization Schema
 * Use this globally (e.g., in Layout or Homepage) to establish brand identity
 */
export const buildOrganizationSchema = (): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      // Add social media URLs here when available
      // "https://www.facebook.com/",
      // "https://www.instagram.com/",
      // "https://twitter.com/",
    ],
  };
};

/**
 * WebSite Schema
 * Use on the homepage to enable sitelinks search box in Google
 */
export const buildWebSiteSchema = (): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: {
    //     "@type": "EntryPoint",
    //     urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
    //   },
    //   "query-input": "required name=search_term_string",
    // },
  };
};

/**
 * Product Schema
 * Use on individual product pages for rich snippets with price, availability, and ratings
 */
export const buildProductSchema = (
  product,
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  },
): SchemaBase => {
  const variant = product.variants[0]; // Use first variant for price/availability
  const price = variant?.price?.amount || product.priceRange?.minVariantPrice?.amount;
  const currencyCode =
    variant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || "GBP";

  const schema: SchemaBase = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.map((img) => img.url) || [],
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.handle}/`,
      priceCurrency: currencyCode,
      price: price,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

  // Add aggregate rating if available
  if (aggregateRating && aggregateRating.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    };
  }

  return schema;
};

/**
 * BreadcrumbList Schema
 * Use on product pages and other deep pages for breadcrumb navigation
 */
export const buildBreadcrumbSchema = (
  items: Array<{
    name: string;
    url: string;
  }>,
): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
};

/**
 * FAQPage Schema
 * Use on the FAQ page to enable rich snippets in search results
 */
export const buildFAQSchema = (questions): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

/**
 * CollectionPage Schema
 * Use on the games listing page
 */
export const buildCollectionPageSchema = (title: string, description?: string): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description || `Browse ${title.toLowerCase()} at ${SITE_NAME}`,
    url: `${SITE_URL}/products/`,
  };
};

/**
 * ItemList Schema
 * Use on listing pages to show a list of products
 */
export const buildItemListSchema = (
  products: Array<{
    title: string;
    handle: string;
    images: Array<{ url: string }>;
  }>,
): SchemaBase => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/products/${product.handle}/`,
      name: product.title,
      image: product.images[0]?.url,
    })),
  };
};
