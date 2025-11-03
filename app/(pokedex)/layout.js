import { Pokedex } from "@/shared/pokedex-promise-v2";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

const DocsLayoutTree = await Promise.all(
  [
    ["getPokemonsList", "pokemon"],
    ["getItemsList", "item"],
    ["getMovesList", "move"],
    ["getStatsList", "stat"],
  ].map(async ([getList, path]) => {
    const data = await Pokedex[getList]();

    return {
      name: `${data.count} ${path}`,
      type: "folder",
      children: data.results.map(({ name }) => ({
        name: Pokedex.formatName(name),
        url: `/${path}/${name}`,
      })),
    };
  })
);

export default ({ children }) => (
  <DocsLayout
    githubUrl="https://www.youtube.com/watch?v=00Qvn3MoYOI"
    tree={{ children: DocsLayoutTree }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%", padding: "2rem" }}
    >
      {children}
    </div>
  </DocsLayout>
);
