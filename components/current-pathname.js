"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CurrentPathname1 = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return searchParams.toString() ? `${pathname}?${searchParams}` : pathname;
};

export const CurrentPathname = () => (
  <Suspense>
    <CurrentPathname1 />
  </Suspense>
);
