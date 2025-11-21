"use client";

import { Image } from "@/(shared)/components";
import { randomItem } from "@/(shared)/utils";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import item1 from "./1.gif";
import item2 from "./2.gif";
import item3 from "./3.gif";
import item4 from "./4.gif";
import item5 from "./5.gif";

const items = [item1, item2, item3, item4, item5];

export const Logo = ({ size = 40 }) => {
  const [state, setState] = useState();
  const pathname = usePathname();

  const effectEvent = useEffectEvent(() => {
    setState(randomItem(items));
  });

  useEffect(effectEvent, [pathname]);

  return state && <Image height={size} src={state} />;
};
