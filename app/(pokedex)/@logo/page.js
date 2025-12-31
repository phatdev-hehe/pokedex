import { LazyImage } from "@/components/client";

import logo from "./cat-dance.gif";

export default () => (
  <LazyImage src={logo} title={process.env.NEXT_PUBLIC_SITE_TITLE} width={30} />
);
