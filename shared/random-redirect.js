"use client";

import { randomItem } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RandomRedirect = ({ path, items }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${path}/${randomItem(items)}`);
  }, []);
};
