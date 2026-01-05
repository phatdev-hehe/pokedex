import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";

export default ({ children }) => (
  <RootProvider
    // https://github.com/fuma-nama/fumadocs/blob/b2a9dd908814c1b5e5ae74334e55f73028ab5448/packages/ui/src/components/dialog/search-default.tsx
    search={{
      options: {
        delayMs: 0,
      },
    }}
  >
    {children}
  </RootProvider>
);
