import { SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";

export default function Post({ data }: { data: SanityDocument }) {
  const { title, body } = data;

  return (
    <main className="prose prose-lg container mx-auto p-4">
      {title ? <h1>{title}</h1> : null}

      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
