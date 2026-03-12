interface Props {
  slug?: string;
  _type:
    | "homepage"
    | "product"
    | "page";
}

export const linkResolver = ({ _type, slug }: Props) => {
  switch (_type) {
    case "product":
      return `/products/${slug}`;
    case "page":
      return `/${slug}`;
    case "homepage":
      return "/";
    default:
      return "/";
  }
};
