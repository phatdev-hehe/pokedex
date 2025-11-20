"use client";

import { Link } from "@/(shared)/components";
import { useRouter } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return (
    <ul>
      <li>
        <Link href="/">Go to the homepage</Link>
      </li>
      <li>
        <Link href="" onClick={router.back}>
          Back
        </Link>
      </li>
      <li>
        <Link href="" onClick={router.forward}>
          Forward
        </Link>
      </li>
      <li>
        <Link href="" onClick={router.refresh}>
          Refresh
        </Link>
      </li>
    </ul>
  );
};
