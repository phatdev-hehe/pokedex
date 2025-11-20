import { Image } from "@/(shared)/components";
import logoSrc from "@/(shared)/logo.gif";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

const pageCounts = await Promise.all(
  Pokedex.api.types.map(
    async (apiType) => (await Pokedex.api(apiType, "getList")()).results.length
  )
);

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
          name: `${pageCounts.reduce((a, b) => a + b, 0)} pages`,
          type: "folder",
          children: Pokedex.api.types.map((apiType, index) => ({
            name: `${titleCase(apiType)} (${pageCounts[index]})`,
            url: `/${apiType}`,
          })),
        },
        {
          type: "folder",
          name: "More",
          defaultOpen: true,
          children:
            // https://fumadocs.dev/docs/ui/rss
            [
              {
                name: "sitemap.xml",
                url: "/sitemap.xml",
              },
              {
                name: "robots.txt",
                url: "/robots.txt",
              },
            ],
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
