import Image from "next/image";

import src from "./2.gif";

export const Logo = ({ size = 40 }) => (
  <Image alt="logo" src={src} width={size} />
);
