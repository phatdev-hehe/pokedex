import { InViewClientOnly } from "@/components/in-view";

export const LazyImage = (props) => (
  <InViewClientOnly>
    <img decoding="async" loading="lazy" {...props} />
  </InViewClientOnly>
);
