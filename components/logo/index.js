import { LazyImage } from "@/components";

import logo from "./cat-dance.gif";

export const Logo = ({ size = 30 }) => (
  <LazyImage
    src={logo}
    title={process.env.NEXT_PUBLIC_SITE_TITLE}
    width={size}
  />
);
