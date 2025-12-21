import { table, tabs } from "@/components";
import { languageLink } from "@/components/link/language-link";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("pokemon-shape");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonShape */
  const pokemonShape = context.data;

  return tabs({
    awesome_names: table.pagination(pokemonShape.awesome_names, {
      renderRows: ({ context }) => [
        context.awesome_name,
        languageLink(context.language),
      ],
      thead: [undefined, "language"],
    }),
    ...Page.tabs.names(pokemonShape.names),
    ...Page.tabs.pokemonSpecies(pokemonShape.pokemon_species),
  });
});
