import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default ({ children }) => (
  <html lang="en" className={inter.className} suppressHydrationWarning>
    <body
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <RootProvider search={{ enabled: false }}>{children}</RootProvider>
    </body>
  </html>
);
