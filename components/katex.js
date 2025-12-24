import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import { PrerenderInView } from "@/components/in-view";

export const inlineMath = (
  math // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
) => (
  <PrerenderInView>
    <span title={math}>
      <InlineMath errorColor="var(--color-fd-error)" math={math} />
    </span>
  </PrerenderInView>
);
