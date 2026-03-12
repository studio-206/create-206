import pluralize from "pluralize-esm";

import ProductHiddenInput from "../../components/inputs/ProductHiddenInput";
import ShopifyDocumentStatus from "../../components/media/ShopifyDocumentStatus";
import { GROUPS } from "../../constants";
import { getPriceRange } from "../../utils/get-price-range";

import { StackCompactIcon, TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: "hidden",
      type: "string",
      components: {
        field: ProductHiddenInput,
      },
      // group: GROUPS.map((group) => group.name),
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === "active";
        const isDeleted = parent?.store?.isDeleted;
        return !parent?.store || (isActive && !isDeleted);
      },
    }),
    defineField({
      name: "titleProxy",
      title: "Title",
      type: "proxyString",
      options: { field: "store.title" },
      group: "shopifySync",
    }),
    defineField({
      name: "slugProxy",
      title: "Slug",
      type: "proxyString",
      options: { field: "store.slug.current" },
      group: "shopifySync",
    }),
    defineField({
      name: "subTitle",
      type: "string",
      title: "Sub Title",
      group: "content",
    }),
    defineField({
      name: "additionalInfo",
      title: "Additional Info",
      description: "To be used for content like 'What's in the box', etc.",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          title: "Item",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text", // block text?
            }),
          ],
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "object",
      icon: StackCompactIcon,
      fields: [
        // Groups
        defineField({
          name: "handpickedRelatedProducts",
          title: "Handpicked Related Products",
          description: "Would you like to handpick the related products?",
          type: "boolean",
          validation: (Rule) => Rule.required(),
          initialValue: false,
        }),
        defineField({
          name: "products",
          title: "Products",
          description: "The related products you would like to show on this page (max 3)",
          type: "array",
          of: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            },
          ],
          validation: (Rule) => Rule.max(3),
          hidden: ({ parent }) => !parent?.handpickedRelatedProducts,
        }),
      ],
      group: "content",
      preview: {
        select: {},
      },
    }),
    defineField({
      name: "store",
      type: "shopifyProduct",
      description: "Product data from Shopify (read-only)",
      group: "shopifySync",
    }),
    defineField({
      name: "seo",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      name: "titleAsc",
      title: "Title (A-Z)",
      by: [{ field: "store.title", direction: "asc" }],
    },
    {
      name: "titleDesc",
      title: "Title (Z-A)",
      by: [{ field: "store.title", direction: "desc" }],
    },
    {
      name: "priceDesc",
      title: "Price (Highest first)",
      by: [{ field: "store.priceRange.minVariantPrice", direction: "desc" }],
    },
    {
      name: "priceAsc",
      title: "Price (Lowest first)",
      by: [{ field: "store.priceRange.minVariantPrice", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      isDeleted: "store.isDeleted",
      options: "store.options",
      previewImageUrl: "store.previewImageUrl",
      priceRange: "store.priceRange",
      status: "store.status",
      title: "store.title",
      variants: "store.variants",
      store: "store",
      productType: "productType",
    },
    prepare(selection) {
      const {
        isDeleted,
        options,
        previewImageUrl,
        priceRange,
        status,
        title,
        variants,
        productType,
      } = selection;
      const isAdPost = productType === "adPost";
      const optionCount = options?.length;
      const variantCount = variants?.length;

      const description = [
        variantCount ? pluralize("variant", variantCount, true) : "No variants",
        optionCount ? pluralize("option", optionCount, true) : "No options",
      ];

      let subtitle = getPriceRange(priceRange);
      if (status !== "active") {
        subtitle = "(Unavailable in Shopify)";
      }
      if (isDeleted) {
        subtitle = "(Deleted from Shopify)";
      }

      return {
        description: description.join(" / "),
        subtitle: `${isAdPost ? "🪧 Ad Post - " : ""}${subtitle}`,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === "active"}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      };
    },
  },
});
