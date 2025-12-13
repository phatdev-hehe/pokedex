import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("pokemon-color");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonColor */
  const pokemonColor = context.data;

  return tabs({
    ...Page.tabs.names(pokemonColor.names),
    ...Page.tabs.pokemonSpecies(pokemonColor.pokemon_species),
  });
});
