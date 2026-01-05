"use client";

import { useImagePreload } from "@madeinhaus/hooks";
import { isPlainObject, pick, sample } from "es-toolkit";
import { useRouter } from "next/navigation";

import { list } from "@/components";
import { ClientInView } from "@/components/in-view";
import { Link } from "@/components/link";
import { useProgressWhen } from "@/hooks";
import { titleCase } from "@/utils/title-case";

export { usePathname as Pathname } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return list(
    <Link href="/">Go to the homepage</Link>,
    ...Object.entries(pick(router, ["back", "forward", "refresh"])).map(
      ([key, value]) => <Link onClick={value}>{titleCase(key)}</Link>
    )
  );
};

export const RandomLink = ({ children, hrefs }) => {
  const router = useRouter();

  return (
    <a // ?
      onClick={() => {
        router.push(sample(hrefs));
      }}
    >
      {children}
    </a>
  );
};

export const LazyImage = ({
  decoding = "async",
  loading = "lazy",
  src,
  ...props
}) => {
  const [loaded, ref] = useImagePreload();

  useProgressWhen(!loaded);

  return (
    <ClientInView>
      <img
        decoding={decoding}
        loading={loading}
        ref={ref}
        {...(isPlainObject(src)
          ? pick(src, ["height", "width", "src"])
          : { src })}
        {...props}
      />
    </ClientInView>
  );
};
