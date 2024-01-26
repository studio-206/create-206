import { Slot } from "@radix-ui/react-slot";
import { QueryParams } from "@sanity/client";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useLiveQuery } from "next-sanity/preview";
import { PropsWithChildren } from "react";

type PreviewDataProps<T = any> = PropsWithChildren<{
  initial: QueryResponseInitial<T>;
  query: string;
  params: QueryParams;
}>;

// Browser-only preview component
export function LiveQueryData<T = any>(props: PreviewDataProps<T>) {
  const { initial, query, params = {}, ...rest } = props;
  const [data] = useLiveQuery(initial, query, params);

  const previewProps = { ...rest, data };

  return <Slot {...previewProps} />;
}
