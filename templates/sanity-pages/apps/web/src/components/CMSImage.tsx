import { getClient } from "@/sanity/client";
import { useNextSanityImage } from "next-sanity-image";
import { Image as ImageType, ImageAsset } from "@sanity/types";
import Image, { ImageProps } from "next/image";
import { tv } from "tailwind-variants";

export type SanityImage = ImageType & { asset: ImageAsset; alt?: string; _key: string };

type ImageComponentProps = {
  src: SanityImage;
  alt?: string;
  className?: string;
  fit?: "contain" | "cover";
  layout?: "fill" | "contain";
  onClick?: () => void;
  sizes?: string;
} & Omit<ImageProps, "src">;

const wrapper = tv({
  base: "block relative overflow-hidden",
});

const CMSImage = ({
  src,
  onClick,
  alt,
  priority = false,
  className,
  layout = "fill",
  fit = "cover",
  sizes = "100vw",
}: ImageComponentProps) => {
  const imageProps = useNextSanityImage(getClient(), src);

  if (layout === "fill") {
    delete (imageProps as ImageProps).width;
    delete (imageProps as ImageProps).height;
  }

  const hashUrl = src.asset.metadata?.blurHash
    ? `/api/blurhash?blurhashUrl=${encodeURIComponent(src.asset.metadata.blurHash)}`
    : "";

  return (
    <div className={wrapper({ class: className })}>
      <Image
        onClick={onClick}
        {...imageProps}
        priority={priority}
        alt={alt}
        placeholder={hashUrl ? "blur" : "empty"}
        blurDataURL={hashUrl}
        sizes={sizes}
        fill={layout === "fill" ? true : false}
        style={{ objectFit: fit === "cover" ? "cover" : "contain" }}
      />
    </div>
  );
};

export default CMSImage;
