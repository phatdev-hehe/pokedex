import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("pokemon-habitat");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonHabitat */
  const pokemonHabitat = context.data;

  return tabs({
    ...Page.tabs.names(pokemonHabitat.names),
    ...Page.tabs.pokemonSpecies(pokemonHabitat.pokemon_species),
  });
});
