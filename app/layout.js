import { RootProvider as FumadocsUIProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { Geist } from "next/font/google";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

import "./css/globals.css";
import ProgressProvider from "./progress-provider";

const font = Geist();

export const metadata = {
  verification: {
    google: "0g4xOknHTsS3aWczVHDj-smtRc9MUBhqsnVTeQVAkKE",
  },
};

export default ({ children }) => (
  <html className={font.className} lang="en" suppressHydrationWarning>
    <body
      // https://fumadocs.dev/docs/ui/manual-installation/next#root-layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <ProgressProvider>
        <FumadocsUIProvider>
          <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
        </FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
