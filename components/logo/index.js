import Image from "next/image";

import src from "./2.gif";

export const Logo = ({ size = 40 }) => (
  <Image alt={process.env.NEXT_PUBLIC_SITE_TITLE} src={src} width={size} />
);
