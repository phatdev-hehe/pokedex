import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { ReactLenis } from "lenis/react";
import { Geist } from "next/font/google";
import "./globals.css";

const font = Geist();

export default ({ children }) => (
  <html lang="en" className={font.className} suppressHydrationWarning>
    <body
      // https://fumadocs.dev/docs/ui/manual-installation/next#root-layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <RootProvider search={{ enabled: false }}>
        <ReactLenis root>{children}</ReactLenis>
      </RootProvider>
    </body>
  </html>
);
