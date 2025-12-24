import { RootProvider as FumadocsUIProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { Geist } from "next/font/google";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

import "./css/globals.css";
import ProgressProvider from "./progress-provider";

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
        <FumadocsUIProvider>
          <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
        </FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
