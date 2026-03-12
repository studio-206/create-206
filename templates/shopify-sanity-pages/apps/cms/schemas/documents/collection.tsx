import pluralize from "pluralize-esm";

import ShopifyDocumentStatus from "../../components/media/ShopifyDocumentStatus";
import { GROUPS } from "../../constants";

import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  icon: PackageIcon,
  groups: GROUPS,
  // orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "titleProxy",
      title: "Title",
      type: "proxyString",
      options: { field: "store.title" },
      group: "shopifySync",
    }),
    // Slug (proxy)
    defineField({
      name: "slugProxy",
      title: "Slug",
      type: "proxyString",
      options: { field: "store.slug.current" },
      group: "shopifySync",
    }),
    defineField({
      name: "store",
      title: "Shopify",
      type: "shopifyCollection",
      description: "Collection data from Shopify (read-only)",
      group: "shopifySync",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      group: "content",
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "seo",
      type: "seo",
      group: "seo",
    }),
    // orderRankField({type: "collection"}),
  ],
  preview: {
    select: {
      imageUrl: "store.imageUrl",
      isDeleted: "store.isDeleted",
      rules: "store.rules",
      title: "store.title",
    },
    prepare(selection) {
      const { imageUrl, isDeleted, rules, title } = selection;
      const ruleCount = rules?.length || 0;

      return {
        media: (
          <ShopifyDocumentStatus
            isDeleted={isDeleted}
            type="collection"
            url={imageUrl}
            title={title}
          />
        ),
        subtitle: ruleCount > 0 ? `Automated (${pluralize("rule", ruleCount, true)})` : "Manual",
        title,
      };
    },
  },
});
