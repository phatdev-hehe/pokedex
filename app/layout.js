import { Geist } from "next/font/google";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

import "./(layout)/css/index.css";
import FumadocsUIProvider from "./(layout)/fumadocs-ui-provider";
import ProgressProvider from "./(layout)/progress-provider";

const font = Geist();

const requiredStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
};

export const metadata = {
  verification: {
    google: "0g4xOknHTsS3aWczVHDj-smtRc9MUBhqsnVTeQVAkKE",
  },
};

export default ({ children }) => (
  <html className={font.className} lang="en" suppressHydrationWarning>
    <body style={requiredStyles}>
      <ProgressProvider>
        <FumadocsUIProvider
          // https://github.com/fuma-nama/fumadocs/blob/b2a9dd908814c1b5e5ae74334e55f73028ab5448/packages/ui/src/components/dialog/search-default.tsx
          search={{
            options: {
              delayMs: 0,
            },
          }}
        >
          <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
        </FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
