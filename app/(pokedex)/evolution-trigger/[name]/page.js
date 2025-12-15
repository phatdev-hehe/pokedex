import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("evolution-trigger");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EvolutionTrigger */
  const evolutionTrigger = context.data;

  return tabs({
    ...Page.tabs.names(evolutionTrigger.names),
    ...Page.tabs.pokemonSpecies(evolutionTrigger.pokemon_species),
  });
});
