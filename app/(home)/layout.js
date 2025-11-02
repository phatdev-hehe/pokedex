import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default ({ children }) => (
  <DocsLayout tree={{ children: [] }}>
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%", padding: "1rem" }}
    >
      {children}
    </div>
  </DocsLayout>
);
