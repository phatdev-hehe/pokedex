import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export const math = (
  math // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
) => (
  <span title={math}>
    <InlineMath math={math} errorColor="var(--color-fd-error)" />
  </span>
);
