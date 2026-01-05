import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import { ClientInView } from "@/components/in-view";

export default (
  math // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
) => (
  <ClientInView>
    <span title={math}>
      <InlineMath errorColor="var(--color-fd-error)" math={math} />
    </span>
  </ClientInView>
);
