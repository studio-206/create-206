import { useState } from "react";
import { tv } from "tailwind-variants";

import { TProductsPage } from "@/lib/types";

// import { ProductProvider } from "@shopify/hydrogen-react";

const buttonClasses = tv({
  base: "py-1.5 px-3 rounded-lg",
  variants: {
    active: {
      true: "bg-club-orange text-card-white",
      false: "bg-club-orange/10 text-club-orange",
    },
  },
});

export const ProductsPageTemplate = ({ data, products }: TProductsPage) => {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  if (!data) {
    console.log("Games data empty");
    return null;
  }

  const { page } = data;

  const collections =
    products
      ?.flatMap((item) => item.product?.collections || [])
      .filter(
        (collection, index, self) =>
          collection && self.findIndex((c) => c?.id === collection.id) === index,
      ) || [];

  return (
    <>
      <section className="col-span-12 lg:col-start-3 lg:col-span-20 text-center pt-[150px] lg:pt-[234px] container">
        <h1>{page?.title}</h1>
      </section>
      <ul className="col-span-12 flex items-center justify-center gap-2 pt-11">
        <li>
          <button
            onClick={() => setActiveCollection(null)}
            className={buttonClasses({ active: activeCollection === null })}
          >
            All
          </button>
        </li>
        {collections?.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveCollection(item.id)}
              className={buttonClasses({ active: activeCollection === item.id })}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      {/* {products?.map((item) => {
          if (
            activeCollection &&
            !item.product?.collections?.some((c) => c.id === activeCollection)
          )
            return null;

          return (
            <ProductProvider key={item.product.id} data={item.contextProduct}>
              <ProductPreview slug={item.slug} {...item.product} className="" />
            </ProductProvider>
          );
        })} */}
    </>
  );
};
