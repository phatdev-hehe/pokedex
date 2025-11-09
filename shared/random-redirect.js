"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const randomItem =
  // https://1loc.completejavascript.com/snippets/random/get-a-random-item-from-an-array
  (arr) => arr[(Math.random() * arr.length) | 0];

export const RandomRedirect = ({ path, items }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${path}/${randomItem(items)}`);
  }, []);
};
