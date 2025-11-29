"use client";

import { Link, ul } from "@/(shared)/components";
import { useRouter } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return ul(
    <Link href="/">Go to the homepage</Link>,
    <Link href="" onClick={router.back}>
      Back
    </Link>,
    <Link href="" onClick={router.forward}>
      Forward
    </Link>,
    <Link href="" onClick={router.refresh}>
      Refresh
    </Link>
  );
};
