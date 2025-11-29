"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CurrentPath1 = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return searchParams.toString() ? `${pathname}?${searchParams}` : pathname;
};

export const CurrentPath = () => (
  <Suspense>
    <CurrentPath1 />
  </Suspense>
);
