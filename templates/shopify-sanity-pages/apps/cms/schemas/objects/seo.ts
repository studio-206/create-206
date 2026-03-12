import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: {
    collapsible: false,
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.max(50).warning("Longer titles may be truncated by search engines"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text" as const,
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning("Longer descriptions may be truncated by search engines"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { accept: ".png, .jpg, .jpeg" },
    }),
  ],
});
