import { LazyImage } from "@/components/lazy-image";

import logo from "./2.gif";

export const Logo = ({ size = 40 }) => <LazyImage src={logo} width={size} />;
