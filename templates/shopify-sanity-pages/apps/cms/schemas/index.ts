// objects
import seo from "./objects/seo";
import collectionRuleType from "./objects/shopify/collectionRuleType";
import inventoryType from "./objects/shopify/inventoryType";
import optionType from "./objects/shopify/optionType";
import placeholderStringType from "./objects/shopify/placeholderStringType";
import priceRangeType from "./objects/shopify/priceRangeType";
import productWithVariantType from "./objects/shopify/productWithVariantType";
import proxyStringType from "./objects/shopify/proxyStringType";
import shopifyCollectionType from "./objects/shopify/shopifyCollectionType";
import shopifyProductType from "./objects/shopify/shopifyProductType";
import shopifyProductVariantType from "./objects/shopify/shopifyProductVariantType";

// documents
import author from "./author";
import blockContent from "./blockContent";
import category from "./category";
import collection from "./documents/collection";
import post from "./post";
import product from "./documents/product";
import productVariant from "./documents/productVariant";

// singletons
import settings from "./singletons/settings";

export const schemaTypes = [
  // objects
  seo,
  collectionRuleType,
  inventoryType,
  optionType,
  placeholderStringType,
  priceRangeType,
  productWithVariantType,
  proxyStringType,
  shopifyCollectionType,
  shopifyProductType,
  shopifyProductVariantType,
  // documents
  author,
  blockContent,
  category,
  collection,
  post,
  product,
  productVariant,
  // singletons
  settings,
];
