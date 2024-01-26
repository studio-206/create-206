import { Slot } from "@radix-ui/react-slot";
import { QueryParams } from "@sanity/client";
import { PropsWithChildren } from "react";
import { LiveQueryData } from "./LiveQueryData";

type PreviewWrapperProps<T> = PropsWithChildren<{
  initialData: T;
  isEnabled?: boolean;
  query?: string;
  params?: QueryParams;
}>;

// Component just renders its children if preview mode is not enabled
export function LiveQueryWrapper<T>(props: PreviewWrapperProps<T>) {
  const {
    // Is live query mode active?
    isEnabled = false,
    // If so, listen to this query
    query = null,
    // With these params
    params = {},
    // Separate remaining props to pass to the child
    ...rest
  } = props;

  // Render child, with the wrapper's initial data and props
  if (!isEnabled || !query) {
    const nonPreviewProps = { ...rest, ...props.initialData };

    return <Slot {...nonPreviewProps} />;
  }

  // Swap initialData for live data
  return (
    <LiveQueryData initialData={props.initialData} query={query} params={params}>
      {props.children}
    </LiveQueryData>
  );
}
