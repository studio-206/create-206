import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { linkResolver } from "@/utils/link-resolver";

import { ShopifyImage } from "@/components/shopify/ShopifyImage";

import { Money, useProduct } from "@shopify/hydrogen-react";
import type {
  Image as TImage,
  MoneyV2,
} from "@shopify/hydrogen-react/storefront-api-types";

interface ProductCardProps {
  slug: string;
  images?: TImage[];
  title: string;
  className?: string;
}

export const ProductCard = ({ slug, images, title, className }: ProductCardProps) => {
  const { product, selectedVariant } = useProduct();
  const image = images && images[0];

  const compareAtPrice = product?.compareAtPriceRange;

  return (
    <article
      className={twMerge(
        "col-span-12 md:col-span-6 lg:col-span-4 text-bare-brown text-center",
        className,
      )}
    >
      <Link href={linkResolver({ _type: "product", slug })}>
        {image && (
          <figure className="aspect-square bg-card-white rounded-3xl overflow-hidden flex justify-center items-center">
            <ShopifyImage image={image} className="object-cover" size="thumb" />
          </figure>
        )}
        <h2 className="mt-6 mb-2">{title}</h2>
        <p className="font-bold">
          <span className="flex justify-center items-baseline gap-3">
            {compareAtPrice && compareAtPrice?.maxVariantPrice?.amount !== "0.0" && (
              <Money
                as="span"
                data={compareAtPrice?.maxVariantPrice as MoneyV2}
                className="line-through"
              />
            )}
            <Money as="span" data={selectedVariant?.price as MoneyV2} />
          </span>
        </p>
      </Link>
    </article>
  );
};
