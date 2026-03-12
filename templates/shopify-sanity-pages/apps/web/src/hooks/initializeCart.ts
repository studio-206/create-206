import { useEffect, useRef, useState } from "react";

import { useCart } from "@shopify/hydrogen-react";

const CART_STORAGE_KEY = "shopifyCartId";
const CART_EXPIRATION_DAYS = 70;

interface StoredCart {
  id: string;
  createdAt: string;
}

const isCartExpired = (storedCart: StoredCart): boolean => {
  const createdAt = new Date(storedCart.createdAt).getTime();
  const now = Date.now();
  return (now - createdAt) / (1000 * 60 * 60 * 24) > CART_EXPIRATION_DAYS;
};

const validateCart = async (cartId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/check-cart?cartId=${cartId}`);
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error("Cart validation failed:", error);
    return false;
  }
};

const useInitializeCart = () => {
  const { cartReady, cartCreate, id: cartId } = useCart();
  const [isInitialized, setIsInitialized] = useState(false);
  const didCreate = useRef(false);

  // Persist cart id to localStorage whenever it changes
  useEffect(() => {
    if (cartId) {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      const existing: StoredCart | null = stored ? JSON.parse(stored) : null;
      if (!existing || existing.id !== cartId) {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify({ id: cartId, createdAt: new Date().toISOString() }),
        );
      }
    }
  }, [cartId]);

  // Initialize cart from localStorage or create a new one
  useEffect(() => {
    if (isInitialized || !cartReady || didCreate.current) return;

    const init = async () => {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      const storedCart: StoredCart | null = stored ? JSON.parse(stored) : null;

      if (storedCart && !isCartExpired(storedCart)) {
        const isValid = await validateCart(storedCart.id);
        if (isValid) {
          setIsInitialized(true);
          return;
        }
      }

      // cartCreate() returns void — cart id becomes available reactively via useCart().id
      didCreate.current = true;
      cartCreate({ lines: [] });
      setIsInitialized(true);
    };

    init();
  }, [cartReady, isInitialized, cartCreate]);

  return { cartId };
};

export default useInitializeCart;
