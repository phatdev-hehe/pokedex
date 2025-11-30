export default ({ style, ...props }) => (
  <img
    alt=" "
    style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
    {...props}
  />
);
