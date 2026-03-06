/* eslint-disable @typescript-eslint/no-explicit-any */
export const pageview = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

export const trackViewContent = (
  productId: string,
  productName: string,
  value: number,
  currency: string,
) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "ViewContent", {
      content_ids: [productId],
      content_name: productName,
      content_type: "product",
      value,
      currency,
    });
  }
};

export const trackAddToCart = (
  productId: string,
  productName: string,
  value: number,
  currency: string,
) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "AddToCart", {
      content_ids: [productId],
      content_name: productName,
      content_type: "product",
      value,
      currency,
    });
  }
};

export const trackInitiateCheckout = (totalValue: number, currency: string, numItems: number) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      value: totalValue,
      currency,
      num_items: numItems,
    });
  }
};
