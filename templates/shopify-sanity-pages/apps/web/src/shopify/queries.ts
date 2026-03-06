// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const productSnippet = `
  id
  handle
  availableForSale
  title
  totalInventory
  images(first: 20) {
    edges {
      node {
        id
        url
        altText
        width
        height
      }
    }
  }
  vendor
  priceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        title
      }
    }
  }
  variants(first: 250) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        sellingPlanAllocations(first: 5) {
          edges {
            node {
              sellingPlan {
                id
                name
              }
            }
          }
        }
        image {
          id
          url
        }
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
      }
    }
  }
  updatedAt
  createdAt
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ${productSnippet}
      description
      descriptionHtml
      options {
        id
        name
        optionValues {
          id
          name
          swatch {
            image {
              previewImage {
                url
              }
            }
          }
        }
      }
      tags
    } 
  }
`;

const GET_PRODUCT_RECOMMENDATIONS = `
  query GetProduct($productId: ID!) {
    productRecommendations(productId: $productId) {
      ${productSnippet}
    } 
  }
`;

const GET_COLLECTION = `
  query GetCollectionById($id: ID!) {
    collection(id: $id) {
      products(first: 200) {
        edges {
          node {
            ${productSnippet}
          }
        }
      }
    } 
  }
`;

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      lines(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export async function getProduct(handle: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
      }),
    },
  );

  const json = await res.json();
  const data = json.data;
  const errors = json.errors;

  if (errors) {
    console.error({ errors });
  }

  return data.product;
}

export async function getRelatedProducts(productId: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: GET_PRODUCT_RECOMMENDATIONS,
        variables: { productId },
      }),
    },
  );

  const json = await res.json();
  const data = json.data;
  const errors = json.errors;

  if (errors) {
    console.error({ errors });
  }

  return data.productRecommendations;
}

export async function getCollection(id: string) {
  if (!id) return null;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: GET_COLLECTION,
        variables: { id },
      }),
    },
  );

  const json = await res.json();
  const data = json.data;
  const errors = json.errors;

  if (errors) {
    console.error({ errors });
  }

  return data?.collection;
}
