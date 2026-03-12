export const formatPrice = (price: string) => {
  return Intl.NumberFormat("GB", {
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(price) || 0);
};

export type PriceInput =
  | string
  | number
  | number[]
  | { minVariantPrice?: number; maxVariantPrice?: number };

export const priceFormat = (contentPrice: PriceInput): string | null => {
  const price = {
    minVariantPrice: null,
    maxVariantPrice: null,
  } as {
    minVariantPrice: number | null;
    maxVariantPrice: number | null;
  };

  if (typeof contentPrice === "string" || typeof contentPrice === "number") {
    price.minVariantPrice = Math.min(contentPrice as number);
    price.maxVariantPrice = Math.max(contentPrice as number);
  } else if (Array.isArray(contentPrice)) {
    price.minVariantPrice = Math.min(...(contentPrice as number[]));
    price.maxVariantPrice = Math.max(...(contentPrice as number[]));
  } else {
    price.minVariantPrice = contentPrice?.minVariantPrice;
    price.maxVariantPrice = contentPrice?.maxVariantPrice;
  }

  if (price.minVariantPrice === null || price.minVariantPrice === undefined) return null;

  return formatPrice(price.minVariantPrice.toString());
};
