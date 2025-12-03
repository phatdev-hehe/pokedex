import { Logo } from "@/components/logo";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

export default ({ children }) => (
  <DocsLayout
    themeSwitch={{ mode: "light-dark-system" }}
    sidebar={{
      defaultOpenLevel: 1,
      prefetch: false,
    }}
    nav={{
      title: <Logo />,
      url: "/random/pokemon",
    }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        ...Object.entries(Pokedex.api.routeMap).map(([key, value]) => ({
          defaultOpen: false,
          type: "folder",
          name: titleCase(key),
          children: Object.keys(value).map((value) => ({
            name: titleCase(value),
            url: `/${value}`,
          })),
        })),
        {
          type: "folder",
          name: "More",
          children: [
            {
              name: "Home",
              url: "/",
            },
            {
              name: "sitemap.xml",
              url: "/sitemap.xml",
            },
            {
              name: "robots.txt",
              url: "/robots.txt",
            },
            {
              name: "local-data.js",
              url: "/api/local-data",
            },
            {
              type: "folder",
              name: "Feed",
              children: [
                {
                  name: "rss2.xml",
                  url: "/api/feed/rss2",
                },
                {
                  name: "atom1.xml",
                  url: "/api/feed/atom1",
                },
                {
                  name: "json1.json",
                  url: "/api/feed/json1",
                },
              ],
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
