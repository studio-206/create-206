import { useCart, useProduct } from "@shopify/hydrogen-react";
import type { CartLineInput as TCartLineInput } from "@shopify/hydrogen-react/storefront-api-types";

export function AddToCart({ itemQuantity }: { itemQuantity: number }) {
  const { product, selectedVariant, selectedSellingPlan } = useProduct();
  const { linesAdd, status } = useCart();
  const isSellingPlan = product?.requiresSellingPlan;

  const merchandise = () => {
    return {
      merchandiseId: selectedVariant?.id,
      sellingPlanId: selectedSellingPlan,
      quantity: itemQuantity || 1,
    } as unknown as TCartLineInput;
  };

  async function lineAddHandler() {
    await linesAdd([merchandise()]);
  }

  return (
    <button
      className={`${!selectedVariant?.availableForSale && "cursor-not-allowed"}`}
      disabled={
        status !== "idle" ||
        !selectedVariant?.availableForSale ||
        (isSellingPlan && !selectedSellingPlan)
      }
      onClick={lineAddHandler}
    >
      {selectedVariant?.availableForSale
        ? status === "updating"
          ? "Adding to cart"
          : "Add to cart"
        : "Sold out"}
    </button>
  );
}
