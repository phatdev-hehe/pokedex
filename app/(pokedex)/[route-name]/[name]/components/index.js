import { compact } from "es-toolkit";

import { LazyImage } from "@/components/lazy-image";
import { Link } from "@/components/link";

export const unnamedLink = (href) => {
  if (href) {
    const [a, b] = compact(new URL(href).pathname.split("/")).slice(-2);

    href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};

export const Avatar = ({ style, ...props }) => (
  <LazyImage
    style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
    {...props}
  />
);
