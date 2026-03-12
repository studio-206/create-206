import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

import { CartItem } from "@/components/shopify/CartItem";

// import DiscountCodeInput from "@/components/shopify/DiscountCodeInput";
import useInitializeCart from "@/hooks/initializeCart";
import { trackInitiateCheckout } from "@/lib/pixel";
import { useGeneralProvider } from "@/lib/providers/GeneralProvider";
import { CartCost, CartLineProvider, useCart } from "@shopify/hydrogen-react";
import { CartLine } from "@shopify/hydrogen-react/storefront-api-types";

export const Cart = () => {
  const { lines, checkoutUrl, totalQuantity, cost } = useCart();
  const { openCart, setOpenCart } = useGeneralProvider();
  const { cartId } = useInitializeCart();
  const { asPath } = useRouter();
  const cartRef = useRef(null);

  const toggleCart = useCallback(() => setOpenCart(!openCart), [openCart]);

  useEffect(() => {
    setOpenCart(false);
  }, [asPath, setOpenCart]);

  const checkoutHandler = () => {
    if (!lines || lines.length === 0) return;

    trackInitiateCheckout(parseFloat(cost?.totalAmount?.amount || "0"), "USD", totalQuantity || 0);

    if (typeof window !== "undefined" && checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  if (!openCart) return null;

  return (
    <>
      <div onClick={toggleCart} className="z-30 bg-black/50 fixed inset-0" />
      <aside
        ref={cartRef}
        data-id={cartId}
        className="fixed top-4 right-4 lg:top-5 lg:right-5 w-[calc(100%-32px)] max-h-[calc(100dvh-32px)] lg:max-h-[calc(100dvh-40px)] lg:w-full lg:max-w-[360px] bg-card-white rounded-[20px] lg:rounded-3xl z-40 px-6 pt-4 pb-8 overflow-y-auto border-[2px] border-bare-brown text-bare-brown"
      >
        <button onClick={toggleCart} className="absolute top-4 right-4 w-10 h-10">
          x
        </button>
        <p>Cart</p>
        {lines && lines.length > 0 ? (
          <>
            {lines?.map((item: CartLine) => {
              return (
                <CartLineProvider key={item.id} line={item}>
                  <CartItem {...item} />
                </CartLineProvider>
              );
            })}
            {/* <DiscountCodeInput /> */}
            <p className="flex gap-2 justify-between items-baseline mb-1">
              <span>Subtotal: </span>
              <CartCost />
            </p>
            <p className="flex gap-2 justify-between items-baseline mb-1">
              <span>Shipping: </span>
              <span>Calculated at checkout</span>
            </p>
            <p className="flex gap-2 justify-between items-baseline mb-4 font-bold">
              <span>Total: </span>
              <CartCost />
            </p>
            {/* <Text size={14} className="flex gap-2 justify-between items-baseline mb-1">
                  <span>* Use discount code at checkout.</span>
                </Text> */}
            <button type="button" onClick={checkoutHandler} className="w-full p-3 cursor-pointer">
              Go to Checkout
            </button>
          </>
        ) : (
          <p>Your basket is empty.</p>
        )}
      </aside>
    </>
  );
};
