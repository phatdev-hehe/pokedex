"use client";

import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";
import { usePathname } from "next/navigation";

export default () => {
  const pathname = usePathname();

  return (
    <DocsBody>
      <Callout title="Loading">{pathname}</Callout>
    </DocsBody>
  );
};
