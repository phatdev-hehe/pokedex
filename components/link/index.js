import { compact } from "es-toolkit";
import Link from "fumadocs-core/link";

export { Link };

export const unnamedLink = (url) => {
  if (url) {
    const [a, b] = compact(new URL(url).pathname.split("/")).slice(-2);
    const href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};
