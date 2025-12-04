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
        thead: [undefined, "language"],
        renderRows: ({ context }) => [
          context.awesome_name,
          <Pokedex.LanguageLink code={context.language.name} />,
        ],
      }),
    ],
    Page.tabs.pokemonSpecies(pokemonShape.pokemon_species)
  );
});
