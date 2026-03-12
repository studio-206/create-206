import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { linkResolver } from "@/utils/link-resolver";

import { ShopifyImage } from "@/components/shopify/ShopifyImage";

import { formatPrice, priceFormat, type PriceInput } from "@/shopify/utils/price";

import type { Image as TImage } from "@shopify/hydrogen-react/storefront-api-types";

interface RelatedProductCardProps {
  slug: string;
  img?: TImage | string;
  title: string;
  price: PriceInput;
  className?: string;
  compareAtPrice?: string | { maxVariantPrice?: string };
}

export const RelatedProductCard = ({
  slug,
  img,
  title,
  price,
  className,
  compareAtPrice,
}: RelatedProductCardProps) => (
  <article
    className={twMerge(
      "col-span-12 md:col-span-6 lg:col-span-4 text-bare-brown text-center",
      className,
    )}
  >
    <Link href={linkResolver({ _type: "product", slug })}>
      {img && (
        <figure className="aspect-square bg-card-white rounded-3xl overflow-hidden relative flex justify-center items-center">
          {img && typeof img === "string" && (
            <Image fill src={img} alt="image" className="object-contain" />
          )}
          {img && typeof img === "object" && (
            <ShopifyImage image={img} className="object-cover max-w-[80%]" size="thumb" />
          )}
        </figure>
      )}

      <h2 className="mt-6 mb-2">{title}</h2>
      <p className="font-bold">
        <span className="flex justify-center items-baseline gap-3">
          {
            // compareAtPrice comes as a string for handpicked related p and as object for shopify ones
            ((compareAtPrice && compareAtPrice?.maxVariantPrice !== "0.0") ||
              (compareAtPrice && typeof compareAtPrice !== "object")) && (
              <span className="line-through">
                {typeof compareAtPrice !== "object"
                  ? formatPrice(compareAtPrice)
                  : priceFormat(compareAtPrice)}
              </span>
            )
          }
          <span>{priceFormat(price)}</span>
        </span>
      </p>
    </Link>
  </article>
);
