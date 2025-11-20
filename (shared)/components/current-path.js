"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const CurrentPath = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return searchParams.toString() ? `${pathname}?${searchParams}` : pathname;
};
