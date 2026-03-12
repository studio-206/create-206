import Image from "next/image";

import { shopifyLoader, shopifyThumbLoader } from "@/shopify/utils/image-loader";
import type { Image as TImage } from "@shopify/hydrogen-react/storefront-api-types";

interface ProductMediaProps {
  image: TImage;
  className?: string;
  size?: "thumb";
}

export const ShopifyImage: React.FC<ProductMediaProps> = ({ image, size, className }) => {
  return (
    <Image
      key={image.id}
      src={image.url}
      width={image?.width || 0}
      height={image?.height || 0}
      loader={size === "thumb" ? shopifyThumbLoader : shopifyLoader}
      alt={image.altText ?? ""}
      className={className}
    />
  );
};
