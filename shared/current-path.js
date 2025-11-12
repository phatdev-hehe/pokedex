"use client";

import { usePathname } from "next/navigation";
import { use } from "react";

const defaultSearchParams = new URLSearchParams();

export const CurrentPath = ({
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  searchParams,
}) => {
  const pathname = usePathname();

  searchParams = searchParams
    ? new URLSearchParams(use(searchParams))
    : defaultSearchParams;

  return searchParams.toString() ? `${pathname}?${searchParams}` : pathname;
};
