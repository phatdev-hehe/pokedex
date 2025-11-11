import logoSrc from "@/logo.gif";
import { Image } from "@/shared/components";
import { navigation } from "@/shared/navigation";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default ({ children }) => (
  <DocsLayout
    nav={{
      title: <Image width={40} src={logoSrc} />,
    }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={navigation.tree}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%" }}
    >
      {children}
    </div>
  </DocsLayout>
);
