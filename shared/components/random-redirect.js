import { RouterActions } from "@/shared/components/router-actions";
import { RouterPush } from "@/shared/components/router-push";
import { randomItem } from "@/shared/utils";
import { Callout } from "fumadocs-ui/components/callout";

export const RandomRedirect = ({ path, items }) => {
  const href = `/${path}/${randomItem(items)}`;

  return (
    <>
      <RouterPush href={href} />
      <Callout type="warn" title="Redirecting to">
        {href}
        <RouterActions />
      </Callout>
    </>
  );
};
