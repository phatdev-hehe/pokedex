import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import { InViewClientOnly } from "@/components/in-view";

export const math = (
  math // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
) => (
  <InViewClientOnly>
    <span title={math}>
      <InlineMath errorColor="var(--color-fd-error)" math={math} />
    </span>
  </InViewClientOnly>
);
