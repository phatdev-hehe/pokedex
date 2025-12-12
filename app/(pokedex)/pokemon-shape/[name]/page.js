import { table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("pokemon-shape");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonShape */
  const pokemonShape = context.data;

  return tabs(
    Page.tabs.names(pokemonShape.names),
    [
      "awesome_names",
      table.pagination(pokemonShape.awesome_names, {
        renderRows: ({ context }) => [
          context.awesome_name,
          <Pokedex.LanguageLink language={context.language} />,
        ],
        thead: [undefined, "language"],
      }),
    ],
    Page.tabs.pokemonSpecies(pokemonShape.pokemon_species)
  );
});
