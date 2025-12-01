import { Link } from "@/components";
import { Logo } from "@/components/logo";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

const createSidebar = async (object) => {
  let pageCount = 0;

  const folders = await Promise.all(
    Object.entries(object).map(async ([value, values]) => ({
      defaultOpen: value === "pokemon",
      type: "folder",
      name: titleCase(value),
      children: await Promise.all(
        values.map(async (value) => {
          const { count } = await Pokedex.api(value, "getList")();

          pageCount += count;

          return {
            name: `${titleCase(value)} (${count})`,
            url: `/${value}`,
          };
        })
      ),
    }))
  );

  return { pageCount, folders };
};

const sidebar = await createSidebar({
  pokemon: [
    "pokemon",
    "ability",
    "gender",
    "pokemon-form",
    "pokemon-species",
    "stat",
    "type",
    "egg-group",
    "growth-rate",
    "pokemon-shape",
  ],
  berries: ["berry", "berry-firmness"],
  evolution: ["evolution-trigger"],
  games: ["generation", "pokedex", "version", "version-group"],
  items: ["item"],
  moves: ["move"],
  utility: ["language"],
});

export default ({ children }) => (
  <DocsLayout
    themeSwitch={{ mode: "light-dark-system" }}
    sidebar={{
      defaultOpenLevel: 1,
    }}
    nav={{ title: <Logo /> }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        {
          name: `${sidebar.pageCount} pages`,
          type: "folder",
          children: sidebar.folders,
        },
        {
          type: "folder",
          name: "More",
          children: [
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
        {
          type: "separator",
          name: (
            <Link
              style={{
                position: "absolute",
                bottom: "calc(var(--spacing) * 4)",
              }}
              href="https://pokeapi.statuspage.io/"
            >
              <img src="https://img.shields.io/badge/dynamic/json?label=PokeAPI&query=$.status.description&url=https://zlfyqp3hlvly.statuspage.io/api/v2/summary.json" />
            </Link>
          ),
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
