import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { Geist } from "next/font/google";
import "./css/globals.css";

const font = Geist();

export default ({ children }) => (
  <html lang="en" className={font.className} suppressHydrationWarning>
    <meta
      name="google-site-verification"
      content="0g4xOknHTsS3aWczVHDj-smtRc9MUBhqsnVTeQVAkKE"
    />
    <body
      // https://fumadocs.dev/docs/ui/manual-installation/next#root-layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <RootProvider>{children}</RootProvider>
    </body>
  </html>
);
