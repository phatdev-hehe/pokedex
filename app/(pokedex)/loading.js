import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";
import { usePathname } from "next/navigation";

import { RouterActions } from "@/components/router";

export default () => {
  const pathname = usePathname();

  return (
    <DocsBody>
      <Callout title="Loading…">
        {pathname}
        <RouterActions />
      </Callout>
    </DocsBody>
  );
};
