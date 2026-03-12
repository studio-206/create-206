// import { useState } from "react";
import { TProductsPage } from "@/lib/types";

// import { ProductProvider } from "@shopify/hydrogen-react";

export const ProductsPageTemplate = ({ data, products }: TProductsPage) => {
  // const [activeCollection, setActiveCollection] = useState<string | null>(null);

  if (!data) {
    console.log("Products page data empty");
    return null;
  }

  const { page } = data;

  // const collections =
  //   products
  //     ?.flatMap((item) => item.product?.collections || [])
  //     .filter(
  //       (collection, index, self) =>
  //         collection && self.findIndex((c) => c?.id === collection.id) === index,
  //     ) || [];

  return (
    <>
      <section className="col-span-12 lg:col-start-3 lg:col-span-20 text-center pt-[150px] lg:pt-[234px] container">
        <h1>{page?.title}</h1>
      </section>
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
