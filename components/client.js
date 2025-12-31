"use client";

import { useImagePreload } from "@madeinhaus/hooks";
import { isPlainObject, pick, sample } from "es-toolkit";
import { useRouter } from "next/navigation";

import { list } from "@/components";
import { PrerenderInView } from "@/components/in-view";
import { Link } from "@/components/link";
import { useProgressWhen } from "@/hooks";

export { usePathname as Pathname } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return list(
    <Link href="/">Go to the homepage</Link>,
    <Link onClick={router.back}>Back</Link>,
    <Link onClick={router.forward}>Forward</Link>,
    <Link onClick={router.refresh}>Refresh</Link>
  );
};

export const RandomLink = ({ children, links }) => {
  const router = useRouter();

  return (
    <Link
      onClick={() => {
        router.push(sample(links));
      }}
    >
      {children}
    </Link>
  );
};

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
