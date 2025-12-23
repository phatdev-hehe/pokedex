import { LazyImage } from "@/components/lazy-image";

import logo from "./cmon-cat.gif";

export const Logo = ({ size = 30 }) => (
  <LazyImage
    src={logo}
    title={process.env.NEXT_PUBLIC_SITE_TITLE}
    width={size}
  />
);
