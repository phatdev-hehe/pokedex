import { Image } from "@/shared/components";
import logoSrc from "@/shared/logo.gif";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

export default ({ children }) => (
  <DocsLayout
    nav={{
      title: <Image width={40} src={logoSrc} />,
    }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        {
          defaultOpen: true,
          name: "List of",
          type: "folder",
          children: Pokedex.api.types.map((apiType) => ({
            name: titleCase(apiType),
            url: `/${apiType}`,
          })),
        },
      ],
    }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%" }}
    >
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
