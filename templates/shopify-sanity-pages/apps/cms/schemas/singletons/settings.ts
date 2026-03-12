import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      name: "navigation",
      title: "Navigation",
      default: true,
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "favicon",
      title: "Favicon",
    },
  ],
  fields: [
    // defineField({
    //   type: "navigation",
    //   name: "navigation",
    //   title: "Navigation",
    //   group: "navigation",
    // }),
    // defineField({
    //   name: "footer",
    //   title: "Footer",
    //   type: "string",
    //   group: "footer",
    // }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "favicon",
      options: { accept: ".png" },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
