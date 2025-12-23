"use client";

import { compact } from "es-toolkit";
import FumadocsLink from "fumadocs-core/link";
import { startTransition, useState } from "react";

export const Link =
  // https://nextjs.org/docs/app/getting-started/linking-and-navigating#disabling-prefetching
  (props) => {
    const [state, setState] = useState(false);

    return (
      <FumadocsLink
        onMouseEnter={() => {
          startTransition(() => {
            setState(true);
          });
        }}
        prefetch={state}
        {...props}
      />
    );
  };

export const UnnamedLink = ({ href }) => {
  if (href) {
    const [a, b] = compact(new URL(href).pathname.split("/")).slice(-2);

    href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};
