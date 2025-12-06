export default ({ style, ...props }) => (
  <img
    style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
    {...props}
  />
);
