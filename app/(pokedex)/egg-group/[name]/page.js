import { tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("egg-group");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EggGroup */
  const eggGroup = context.data;

  return tabs({
    ...Page.tabs.names(eggGroup.names),
    ...Page.tabs.pokemonSpecies(eggGroup.pokemon_species),
  });
});
