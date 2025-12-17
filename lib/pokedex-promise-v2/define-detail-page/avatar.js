import { InViewClientOnly } from "@/components/in-view";

export default ({ style, ...props }) => (
  <InViewClientOnly>
    <img
      style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
      {...props}
    />
  </InViewClientOnly>
);
