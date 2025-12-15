import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

import { Logo } from "@/components/logo";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const sidebar = [];

for (const [key, value] of Object.entries(Pokedex.api.routeMap)) {
  sidebar.push({
    name: titleCase(key),
    type: "separator",
  });

  for (const key of Object.keys(value))
    sidebar.push({
      name: titleCase(key),
      url: `/${key}`,
    });
}

export default ({ children }) => (
  <DocsLayout
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    nav={{
      title: <Logo />,
      url: "/random/pokemon",
    }}
    themeSwitch={{ mode: "light-dark-system" }}
    tree={{
      children: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Random",
          url: "/random",
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
          name: "Feed",
          type: "folder",
        },
        ...sidebar,
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
