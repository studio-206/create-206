import { useState } from "react";

import { AddToCart } from "@/components/shopify/AddToCart";
import { QuantityCounter } from "@/components/shopify/QuantityCounter";

import { TPage } from "@/lib/types";
import { Money, useProduct } from "@shopify/hydrogen-react";
import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

export function ProductTemplate({ data }: TPage) {
  const { product, selectedVariant } = useProduct();
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  if (!data) {
    console.log("Products data empty");
    return null;
  }

  const { page } = data;

  const title = page?.product?.title;
  const availableForSale = product?.availableForSale;
  const compareAtPrice = product?.compareAtPriceRange;

  const handleQuantityChange = (value: number) => {
    setItemQuantity((prev) => Math.max(prev + value, 1));
  };

  return (
    <div className="col-span-12 lg:col-start-14 lg:col-span-10 xl:col-span-9 xl:col-start-14 flex flex-col gap-8">
      <h1>{title}</h1>
      {availableForSale && (
        <div className="flex items-center justify-start gap-6">
          <div>
            <QuantityCounter
              handleQuantityChange={handleQuantityChange}
              quantity={itemQuantity}
              qtyLimit={selectedVariant?.quantityAvailable || 1}
            />
          </div>

          <p>
            {availableForSale ? (
              <span className="flex justify-start items-baseline gap-3">
                {compareAtPrice && compareAtPrice?.maxVariantPrice?.amount !== "0.0" && (
                  <Money
                    as="span"
                    data={compareAtPrice?.maxVariantPrice as MoneyV2}
                    className="line-through"
                  />
                )}
                <Money as="span" data={selectedVariant?.price as MoneyV2} />
              </span>
            ) : (
              "Sold out"
            )}
          </p>
        </div>
      )}
      <AddToCart itemQuantity={itemQuantity} />
    </div>
  );
}
