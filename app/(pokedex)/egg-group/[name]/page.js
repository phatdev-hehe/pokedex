import { table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";

const Page = await Pokedex.createDetailPage("egg-group");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type EggGroup */
  const eggGroup = context.data;

  return (
    <>
      {table(undefined, [["Id", eggGroup.id]])}
      {Page.tabs(
        Page.tabs.names(eggGroup.names),
        Page.tabs.pokemonSpecies(eggGroup.pokemon_species, {
          description:
            "A list of all Pokémon species that are members of this egg group.",
        })
      )}
    </>
  );
});
