"use client";

import { sample } from "es-toolkit";
import { useRouter } from "next/navigation";

import { list } from "@/components";
import { Link } from "@/components/link";

export { usePathname as Pathname } from "next/navigation";

export const RouterActions = () => {
  const router = useRouter();

  return list(
    <Link href="/">Go to the homepage</Link>,
    <Link onClick={router.back}>Back</Link>,
    <Link onClick={router.forward}>Forward</Link>,
    <Link onClick={router.refresh}>Refresh</Link>
  );
};

export const RandomLink = ({ children, links }) => {
  const router = useRouter();

  return (
    <a
      onClick={() => {
        router.push(sample(links));
      }}
    >
      {children}
    </a>
  );
};
