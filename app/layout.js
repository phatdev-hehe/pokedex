import { Geist } from "next/font/google";
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

import "./layout/css/index.css";
import FumadocsUIProvider from "./layout/fumadocs-ui-provider";
import ProgressProvider from "./layout/progress-provider";

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
  <html
    className={font.className}
    lang={process.env.NEXT_PUBLIC_LOCALE}
    suppressHydrationWarning
  >
    <body style={requiredStyles}>
      <ProgressProvider>
        <FumadocsUIProvider>
          <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
        </FumadocsUIProvider>
      </ProgressProvider>
    </body>
  </html>
);
