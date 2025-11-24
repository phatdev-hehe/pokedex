import { table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("evolution-trigger");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EvolutionTrigger */
  const evolutionTrigger = context.data;

  return (
    <>
      {table(undefined, [["Id", evolutionTrigger.id]])}
      {Page.tabs(
        Page.tabs.names(evolutionTrigger.names),
        Page.tabs.pokemonSpecies(evolutionTrigger.pokemon_species, {
          description:
            "A list of pokemon species that result from this evolution trigger.",
        })
      )}
    </>
  );
});
