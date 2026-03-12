import Link from "next/link";

import { ShopifyImage } from "@/components/shopify/ShopifyImage";

import { CartLineQuantity, CartLineQuantityAdjustButton, Money } from "@shopify/hydrogen-react";
import { CartLine } from "@shopify/hydrogen-react/storefront-api-types";

export const CartItem: React.FC<CartLine> = ({ merchandise, cost }) => {
  const { image, product } = merchandise;
  const { title, handle } = product;
  const { totalAmount } = cost;

  return (
    <div className="flex gap-4 pb-6 mb-6">
      {image && (
        <div className="max-w-[96px] aspect-square overflow-hidden rounded-xl ">
          <ShopifyImage image={image} className="object-cover" size="thumb" />
        </div>
      )}
      <div className="flex flex-col flex-auto">
        <Link href={`/products/${handle}`}>{title}</Link>
        <Money
          as="span"
          data={totalAmount}
          style={{ display: "inline-block", marginRight: "5px" }}
        />
        <div className="flex justify-between items-center gap-2 mt-auto">
          <div className="flex justify-between items-center py-1.5 px-2 gap-7 relative">
            <CartLineQuantityAdjustButton data-state="open" className="group" adjust="decrease">
              —
            </CartLineQuantityAdjustButton>
            <CartLineQuantity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <CartLineQuantityAdjustButton adjust="increase">+</CartLineQuantityAdjustButton>
          </div>
          <CartLineQuantityAdjustButton adjust="remove">
            <span className="underline hover:no-underline">Remove</span>
          </CartLineQuantityAdjustButton>
        </div>
      </div>
    </div>
  );
};
