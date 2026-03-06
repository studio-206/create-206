import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const POSTS_SLUG_QUERY = groq`*[_type == "post" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

export const PRODUCTS_PAGE_QUERY = groq`*[_type == "page" && slug.current == 'products'][0]`;

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && defined(store.slug.current) && store.isDeleted != true && store.status != 'draft']{
    store {
      id,
      gid,
      title,
      "slug": slug.current,
    }
  }
`;

export const PRODUCT_PATH_QUERY = groq`*[_type == "product" && defined(store.slug.current) && store.isDeleted != true && store.status != 'draft'].store.slug.current`;

export const PRODUCT_QUERY = groq`{
  "page": *[_type == "product" && store.slug.current == $slug]{
    ...,
    relatedProducts { 
      ...,
      products[]->{
        ...,
        "slug": store.slug.current,
        "variants": store.variants[]->{
          "compareAtPrice": store.compareAtPrice
        }
      }
    },
    store {
      ...,
      priceRange,
      variants[]->{ ... }
    },
    seo
  }[0],
}`;

export const SETTINGS_QUERY = groq`*[_type == "settings"] {
  _id,
  seo {
    ...,
    image {
      alt,
      asset ->
    }
  },
  favicon {
    asset -> {
      url
    }
  },
}`;
