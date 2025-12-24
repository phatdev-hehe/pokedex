import { LazyImage } from "@/components";

export default ({ style, ...props }) => (
  <LazyImage
    style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
    {...props}
  />
);
