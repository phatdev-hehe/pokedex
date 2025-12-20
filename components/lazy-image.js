import { isPlainObject, pick } from "es-toolkit";

import { InViewClientOnly } from "@/components/in-view";

export const LazyImage = ({ src, ...props }) => (
  <InViewClientOnly>
    <img
      decoding="async"
      loading="lazy"
      {...(isPlainObject(src)
        ? pick(src, ["height", "width", "src"])
        : { src })}
      {...props}
    />
  </InViewClientOnly>
);
