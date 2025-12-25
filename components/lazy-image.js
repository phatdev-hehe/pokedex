/* eslint-disable @next/next/no-img-element */

"use client";

import { useImagePreload } from "@madeinhaus/hooks";
import { isPlainObject, pick } from "es-toolkit";

import { PrerenderInView } from "@/components/in-view";
import { useProgressWhen } from "@/hooks";

export const LazyImage = ({
  decoding = "async",
  loading = "lazy",
  src,
  ...props
}) => {
  const [loaded, fnRef] = useImagePreload();

  useProgressWhen(!loaded);

  return (
    <PrerenderInView>
      <img
        decoding={decoding}
        loading={loading}
        ref={fnRef}
        {...(isPlainObject(src)
          ? pick(src, ["height", "width", "src"])
          : { src })}
        {...props}
      />
    </PrerenderInView>
  );
};
