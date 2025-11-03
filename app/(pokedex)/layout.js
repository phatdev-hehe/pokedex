import { Pokedex } from "@/pokedex-promise-v2";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

const pokemonsList = await Pokedex.getPokemonsList();
const itemsList = await Pokedex.getItemsList();
const movesList = await Pokedex.getMovesList();

const createNode = (data, path) => ({
  name: `${data.count} ${path}`,
  type: "folder",
  children: data.results.map(({ name }) => ({
    name: Pokedex.formatName(name),
    url: `/${path}/${name}`,
  })),
});

export default ({ children }) => (
  <DocsLayout
    tree={{
      children: [
        createNode(pokemonsList, "pokemon"),
        createNode(itemsList, "item"),
        createNode(movesList, "move"),
      ],
    }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%", padding: "2rem" }}
    >
      {children}
    </div>
  </DocsLayout>
);
