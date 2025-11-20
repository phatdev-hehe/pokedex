import { Link, table, tabs } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const Page = await Pokedex.createDetailPage("evolution-trigger");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EvolutionTrigger */
  const evolutionTrigger = context.data;

  return (
    <>
      {table(undefined, [["Id", evolutionTrigger.id]])}
      {Page.tabs(Page.tabs.names(evolutionTrigger.names), [
        "pokemon_species",
        "A list of pokemon species that result from this evolution trigger.",
        tabs.paginate(evolutionTrigger.pokemon_species, (pokemonSpecies) => (
          <Link href={`/pokemon-species/${pokemonSpecies.name}`}>
            {titleCase(pokemonSpecies.name)}
          </Link>
        )),
      ])}
    </>
  );
});
