import { ImageLoaderProps } from "next/image";

export function shopifyLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}&width=${width}&q=${quality || 75}`;
}

export function shopifyThumbLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}&width=${width / 3}&q=${quality || 75}`;
}
