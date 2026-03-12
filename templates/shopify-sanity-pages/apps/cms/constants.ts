import ShopifyIcon from "./components/ShopifyIcon"
import { CogIcon, ImagesIcon } from "@sanity/icons"

export const DEFAULT_CURRENCY_CODE = "GBP"

// Your Shopify store ID.
// This is the ID in your Shopify admin URL (e.g. 'my-store-name' in https://admin.shopify.com/store/my-store-name).
// You only need to provide the ID, not the full URL.
// Set this to enable helper links in document status banners and shortcut links on products and collections.
export const SHOPIFY_STORE_ID = ""

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the Sanity Connect Shopify app - and can be linked to on Shopify
export const SHOPIFY_DOCUMENT_TYPES = ["product", "productVariant", "collection"]

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = "2022-11-15"

export const LOCKED_DOCUMENT_TYPES = [
  "settings",
  "homePage",
]

export const PAGES_REFERENCES = [
  {type: "homePage"},
]

export const GROUPS = [
  {name: "content", title: "Content", icon: ImagesIcon, default: true},
  {
    name: "shopifySync",
    title: "Shopify sync",
    icon: ShopifyIcon,
  },
  {name: "seo", title: "SEO", icon: CogIcon},
]
