import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";
import Link from "next/link";

export default () => (
  <DocsBody>
    <Callout type="error" title="404">
      This page could not be found. <Link href="/">Go to the homepage</Link>
    </Callout>
  </DocsBody>
);
